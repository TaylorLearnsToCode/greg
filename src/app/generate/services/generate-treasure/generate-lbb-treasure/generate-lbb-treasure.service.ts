import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
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
import { LbbSwordService } from './lbb-sword/lbb-sword.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
  /** Map of probability to jewelry value: from least valuable to most */
  private readonly JEWELRY_VALUE_THRESHOLDS: Map<number, DiceRolled> = new Map([
    [
      20,
      new DiceRolled({
        multiplier: 100,
        no: 3,
      } as DiceRolled),
    ],
    [
      80,
      new DiceRolled({
        multiplier: 1000,
      } as DiceRolled),
    ],
    [
      100,
      new DiceRolled({
        multiplier: 1000,
        pips: 10,
      } as DiceRolled),
    ],
  ]);
  /** Persisted data types supported by GREG */
  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  /** DecimalPipe for formatting */
  private decimalPipe: DecimalPipe = new DecimalPipe('en-US');
  /** Response object built and returned by the generate jewelry function */
  private jewelResult: ValueablesResult[];

  constructor(
    private dataService: DataManagerService,
    private gemsService: LbbGemsService,
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
    if (rollDice(article.diceRolled) <= article.chanceOf) {
      this.jewelResult = [];
      const jewelryCount: number = rollDice(article.quantity as DiceRolled);

      let jewel: ValueablesResult;
      for (let i = 0; i < jewelryCount; i++) {
        jewel = this.generateJewel();
        this.addOrIncrementJewel(jewel);
      }

      this.jewelResult.sort((a, b) => a.value - b.value);
      return this.jewelResult;
    }
    return null;
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
    const noItems: number = this.rollArticleQuantity(item);
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
    const noMaps: number = this.rollArticleQuantity(article);
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
              .map((result) => this.prettyPrintTreasureResult(result))
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
            throw new Error(
              `Unsupported type ${entry.persistenceType} encountered.`
            );
        }
      }
    }

    return result;
  }

  /**
   * If no jewel of the present value is detected in the active result response, adds this
   * to it. If at least one result is present already, increments the pre-existing set.
   *
   * @param  {ValueablesResult} jewel
   */
  private addOrIncrementJewel(jewel: ValueablesResult): void {
    const jewelIndex: number = this.jewelResult.findIndex(
      (j) => j.value === jewel.value
    );
    if (jewelIndex == -1) {
      this.jewelResult.push(jewel);
    } else {
      this.jewelResult[jewelIndex].quantity += jewel.quantity;
    }
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

  /** Generates a new article of jewelry with calculated value */
  private generateJewel(): ValueablesResult {
    const jewel = new ValueablesResult({
      value: this.generateJewelryValue(),
      quantity: 1,
    } as ValueablesResult);
    jewel.name = `Jewelry (${jewel.value} ${jewel.denomination})`;
    return jewel;
  }

  /** Generates a calculated jewelry value based on constant probability. */
  private generateJewelryValue(): number {
    const roll: number = rollDice(this.d100);
    let returnValue: number = -1;
    for (const key of this.JEWELRY_VALUE_THRESHOLDS.keys()) {
      if (roll <= key) {
        returnValue = rollDice(
          this.JEWELRY_VALUE_THRESHOLDS.get(key) as DiceRolled
        );
        break;
      }
    }
    if (returnValue === -1) {
      throw new Error(`No jewelry value threshold found for roll ${roll}`);
    } else {
      return returnValue;
    }
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
          throw new Error(
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
            throw new Error(
              `Unsupported item type ${entry.persistenceType} encountered.`
            );
        }
      }
    }
    return result;
  }

  /**
   * Prints the provided result in a human-happy way.
   * @TODO - Move this to a .toString() override?
   *
   * @param  {TreasureResult} result
   */
  private prettyPrintTreasureResult(result: TreasureResult): string {
    const response = ''.concat(
      `${this.decimalPipe.transform(result.quantity, '1.0')}`,
      ' ',
      result.name.includes('-')
        ? result.name.split('-')[result.name.split('-').length - 1]
        : result.name
    );
    return response;
  }

  /**
   * Returns the quantity of a given TreasureArticle, guaranteed a number, rolled
   * if dice are provided.
   * @TODO - extract into a utility function?
   *
   * @param  {TreasureArticle} article
   */
  private rollArticleQuantity(article: TreasureArticle): number {
    if (!doesExist(article) || !doesExist(article.quantity)) {
      return 1;
    }
    return doesExist((article.quantity as DiceRolled).pips)
      ? rollDice(article.quantity as DiceRolled)
      : (article.quantity as number);
  }
}
