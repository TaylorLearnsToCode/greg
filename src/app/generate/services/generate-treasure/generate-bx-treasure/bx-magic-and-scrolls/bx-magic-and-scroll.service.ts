import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { rollArticleQuantity } from '@generate/utilities/treasure-util/treasure.util';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist, isBetween, isEmpty } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { BxSwordService } from '../bx-sword/bx-sword.service';

@Injectable({
  providedIn: 'root'
})
export class BxMagicAndScrollService {

  /* BX Magic item generation is + C O M P L I C A T E D + 
     Magic items take up one slot in a given treasure type. These slots are a given number of magic items that are rolled on a table or specific.
     For example, treasure type G has a 35% of containing 4 Magic Items plus 1 scroll. So you roll on the magic item table 4 times, and generate 
     based on that and then generate an additional scroll. The magic item tables differ for wether you are generating for Basic (Character Level 1-3) 
     or Expert (character level 4-14). */
     
     private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES

  constructor(
    private dataService: DataManagerService,
    private swordService: BxSwordService
  ) { }
  
  generateMagicItemsAndScrolls(article: TreasureArticle): TreasureResult[] | null {
    let targetItem:  MagicItem | ReferenceEntryTable;

    const results: TreasureResult[] = [];
    const noItems: number = rollArticleQuantity(article);
    for (let i = 0; i < noItems; i++) {
      targetItem = this.dataService.retrieveReference(
        article.name,
        this.PERSISTENCE_TYPES.magicItemTable
      );
      if (!doesExist(targetItem)) {
        targetItem = this.dataService.retrieveReference(
          article.name,
          this.PERSISTENCE_TYPES.magicItem
        );
      }
      if (doesExist((targetItem as ReferenceEntryTable).entries)) {
        results.push(
          ...this.generateMagicItemFromTable(
            targetItem as ReferenceEntryTable
          ).map((magicItem) => this.convertNamedItemToTreasureResult(magicItem))
        );
      } else {
        results.push(this.convertNamedItemToTreasureResult(targetItem));
      }
    }

    return isEmpty(results) ? null : results;
  }
  
  /**
   * For any object with a "name" or, optionally, "quantity" property, converts said object
   * into a TreasureResult.
   *
   * @param  {any} namedItem
   */
  private convertNamedItemToTreasureResult(namedItem: any): TreasureResult {
    const treasureResult = new TreasureResult({
      name: this.swordService.appendSwordCharacteristics(namedItem.name),
    });
    if (doesExist(namedItem.quantity)) {
      treasureResult.quantity = (namedItem.quantity as DiceRolled).pips
        ? rollDice(namedItem.quantity as DiceRolled)
        : (namedItem.quantity as number);
    }
    return treasureResult;
  
  }
   private generateTreasureMap(article: TreasureArticle) {
    throwError("Method not implemented");
    return [];
  }
  
  /**
   * Rolls on a provided magic item table and returns a collection of magic items.
   *
   * @param  {ReferenceEntryTable} magicItemTable
   */
  private generateMagicItemFromTable(
    magicItemTable: ReferenceEntryTable
  ): MagicItem[] {
    const roll: number = rollDice(magicItemTable.diceToRoll);
    let result: MagicItem[] = [];
    let item: MagicItem | ReferenceEntryTable;
    for (const entry of magicItemTable.entries) {
      if (isBetween(roll, entry.chanceOf)) {
        item = this.dataService.retrieveReference(
          entry.reference,
          entry.persistenceType
        );
        if (
          !doesExist(item) &&
          entry.persistenceType === this.PERSISTENCE_TYPES.magicItemTable
        ) {
          item = this.dataService.retrieveReference(
            entry.reference,
            this.PERSISTENCE_TYPES.treasureMap
          );
        }
        if (!doesExist(item)) {
          throwError(
            `Unable to find reference for ${entry.reference}, type ${entry.persistenceType}`
          );
        }
        switch (entry.persistenceType) {
          case this.PERSISTENCE_TYPES.magicItemTable:
            result.push(
              ...this.generateMagicItemFromTable(item as ReferenceEntryTable)
            );
            break;
          case this.PERSISTENCE_TYPES.magicItem:
            result.push(item as MagicItem);
            break;
          case this.PERSISTENCE_TYPES.treasureMap:
            const mapResults: TreasureResult[] | null =
              this.generateTreasureMap(item as TreasureArticle);
            if (mapResults) {
              result.push(
                ...mapResults.map(
                  (result) =>
                    new MagicItem({
                      name: result.name,
                      quantity: result.quantity,
                    } as MagicItem)
                )
              );
            }
            break;
          default:
            throwError(
              `Unsupported item type ${entry.persistenceType} encountered.`
            );
        }
      }
    }
    return result;
  }

}
