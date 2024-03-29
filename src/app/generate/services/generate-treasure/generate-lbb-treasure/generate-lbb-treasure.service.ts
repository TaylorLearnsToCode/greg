import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { LbbGemsService } from '@generate/services/generate-treasure/generate-lbb-treasure/lbb-gems/lbb-gems.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import {
  doesExist,
  isBetween,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { LbbJewelsService } from './lbb-jewels/lbb-jewels.service';
import { LbbSwordService } from './lbb-sword/lbb-sword.service';
import { rollArticleQuantity } from '@generate/utilities/treasure-util/treasure.util';
import { prettyPrintTreasureResult } from '@generate/utilities/treasure-util/treasure.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService {
  /** Persisted data types supported by GREG */
  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  /** DecimalPipe for formatting */
  private decimalPipe: DecimalPipe = new DecimalPipe('en-US');

  constructor(
    private dataService: DataManagerService,
    private gemsService: LbbGemsService,
    private jewelsService: LbbJewelsService,
    private swordService: LbbSwordService
  ) {
    super();
  }

  /**
   * Returns a collection of ValueablesResults, as rolled according to a provided configuration.
   *
   * @param  {TreasureArticle} article
   */
  generateGems(article: TreasureArticle): ValueablesResult[] | null {
    return this.gemsService.generateGems(article);
  }

  /**
   * Returns a collection of ValueablesResults, as rolled according to a provided configuration.
   *
   * @param  {TreasureArticle} article
   */
  generateJewelry(article: TreasureArticle): ValueablesResult[] | null {
    return this.jewelsService.generateJewelry(article);
  }

  /**
   * From a reference TreasureArticle, produces a magic item as TreasureResult, digging
   * through nested tables, as necessary.
   *
   * @param  {TreasureArticle} item
   */
  generateMagicItem(item: TreasureArticle): TreasureResult[] | null {
    let targetItem: MagicItem | ReferenceEntryTable;

    const results: TreasureResult[] = [];
    const noItems: number = rollArticleQuantity(item);
    for (let i = 0; i < noItems; i++) {
      targetItem = this.dataService.retrieveReference(
        item.name,
        this.PERSISTENCE_TYPES.magicItemTable
      );
      if (!doesExist(targetItem)) {
        targetItem = this.dataService.retrieveReference(
          item.name,
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
   * For a treasure map included as part of a treasure - i.e. a TreasureArticle - rolls the result
   * of that treasure map and returns a ValueablesResult containing the contents to be found at the
   * map's destination.
   *
   * @param  {TreasureArticle} article
   */
  generateTreasureMap(article: TreasureArticle): TreasureResult[] | null {
    let map: ReferenceEntryTable;
    let mapResult: TreasureMapResult | null;

    const results: TreasureResult[] = [];
    const noMaps: number = rollArticleQuantity(article);
    for (let i = 0; i < noMaps; i++) {
      map = this.dataService.retrieveReference<ReferenceEntryTable>(
        article.name,
        this.PERSISTENCE_TYPES.treasureMap
      );
      mapResult = this.generateTreasureMapResult(map);
      if (doesExist(mapResult) && mapResult?.results) {
        results.push(
          new TreasureResult({
            name: `Map to ${mapResult.results
              .map((result) => prettyPrintTreasureResult(result))
              .join(', ')}`,
            quantity: 1,
          } as TreasureResult)
        );
      }
    }
    return isEmpty(results) ? null : results;
  }

  /**
   * Returns a TreasureMapResult, as rolled on a provided ReferenceEntryTable, assumed to
   * be a treasure map or nested treasure map.
   *
   * @param  {ReferenceEntryTable} map
   */
  generateTreasureMapResult(
    map: ReferenceEntryTable
  ): TreasureMapResult | null {
    const result: TreasureMapResult = new TreasureMapResult({ name: map.name });
    const roll: number = rollDice(map.diceToRoll);

    let article: TreasureArticle | ReferenceEntryTable;
    for (const entry of map.entries) {
      if (isBetween(roll, entry.chanceOf)) {
        article = this.dataService.retrieveReference(
          entry.reference,
          entry.persistenceType
        );

        switch (entry.persistenceType) {
          case this.PERSISTENCE_TYPES.magicItemTable:
            result.results.push(
              ...this.generateMagicItemFromTable(
                article as ReferenceEntryTable
              ).map((magicItem) =>
                this.convertNamedItemToTreasureResult(magicItem)
              )
            );
            break;
          case this.PERSISTENCE_TYPES.treasureArticle:
            console.warn(`${entry.persistenceType} Encountered`);
            break;
          case this.PERSISTENCE_TYPES.treasureMap:
            const treasureMapResult: TreasureMapResult | null =
              this.generateTreasureMapResult(article as ReferenceEntryTable);
            if (doesExist(treasureMapResult) && treasureMapResult?.results) {
              result.results.push(...treasureMapResult.results);
            }
            break;
          case this.PERSISTENCE_TYPES.treasureMapRef:
            result.results.push(
              ...this.generateTreasureByArticleType(article as TreasureArticle)
            );
            break;
          default:
            throwError(
              `Unsupported type ${entry.persistenceType} encountered.`
            );
        }
      }
    }

    return result;
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
