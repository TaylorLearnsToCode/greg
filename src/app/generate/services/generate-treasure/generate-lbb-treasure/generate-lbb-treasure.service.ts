import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ValueablesResult } from '@generate/model/valuables-result.model';
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

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
  /** One six sided die */
  private readonly d6 = new DiceRolled();
  /** The values of gems, presented least to most */
  private readonly GEM_SEQUENTIAL_VALUE: number[] = [
    10, 50, 100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 500000,
  ];
  /** Map of probability to gem base value: from least valuable to most */
  private readonly GEM_VALUE_THRESHOLDS: Map<number, number> = new Map([
    [10, 10],
    [25, 50],
    [75, 100],
    [90, 500],
    [100, 1000],
  ]);
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

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  /** The number of gems sequentially eligible for a "bump" - expressed as the Nth gem processed */
  private bumpEvery: number;
  /** DecimalPipe for formatting */
  private decimalPipe: DecimalPipe = new DecimalPipe('en-US');
  /** Response object built and returned by the generate gems function */
  private gemResult: ValueablesResult[];
  /** Response object built and returned by the generate jewelry function */
  private jewelResult: ValueablesResult[];
  /** The Nth gem under processing: one greater than the index of the current gem in the gem iterator */
  private nthGem: number;

  constructor(private dataService: DataManagerService) {
    super();
  }

  /**
   * Returns a collection of ValueablesResults, as rolled according to a provided configuration.
   *
   * @param  {TreasureArticle} article
   */
  generateGems(article: TreasureArticle): ValueablesResult[] | null {
    if (rollDice(article.diceRolled) <= article.chanceOf) {
      this.gemResult = [];
      const gemCount: number = rollDice(article.quantity as DiceRolled);
      this.deriveBumpEvery(gemCount);

      let gem: ValueablesResult;
      for (let i = 0; i < gemCount; i++) {
        this.nthGem = i + 1;
        gem = this.generateGem();
        this.addOrIncrementGem(gem);
      }

      this.gemResult.sort((a, b) => a.value - b.value);
      return this.gemResult;
    }
    return null;
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
    const noMaps: number = (article.quantity as DiceRolled).pips
      ? rollDice(article.quantity as DiceRolled)
      : (article.quantity as number);
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
              ).map(
                (magicItem) =>
                  new TreasureResult({
                    name: magicItem.name,
                    quantity: (magicItem.quantity as DiceRolled).pips
                      ? rollDice(magicItem.quantity as DiceRolled)
                      : (magicItem.quantity as number),
                  } as TreasureResult)
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
            console.warn(`${entry.persistenceType} Encountered`);
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
   * If no gem of the present value is detected in the active result response, adds this
   * to it. If at least one result is present already, increments the pre-existing set.
   *
   * @param  {ValueablesResult} gem
   */
  private addOrIncrementGem(gem: ValueablesResult): void {
    const gemIndex: number = this.gemResult.findIndex(
      (g) => g.value === gem.value
    );
    if (gemIndex == -1) {
      this.gemResult.push(gem);
    } else {
      this.gemResult[gemIndex].quantity += gem.quantity;
    }
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
   * Recursively potentially bumps the gem up to a maximum value as configured in the
   * GEM_SEQUENTIAL_VALUE instance property
   *
   * @param  {number} currentValue
   */
  private bumpGemValue(currentValue: number): number {
    let nextValue: number = currentValue;
    if (
      nextValue !==
        this.GEM_SEQUENTIAL_VALUE[this.GEM_SEQUENTIAL_VALUE.length - 1] &&
      rollDice(this.d6) === 1
    ) {
      const nextValueIndex: number =
        this.GEM_SEQUENTIAL_VALUE.findIndex((value) => value === nextValue) + 1;
      if (nextValueIndex != 0) {
        nextValue = this.GEM_SEQUENTIAL_VALUE[nextValueIndex];
        nextValue = this.bumpGemValue(nextValue);
      }
    }
    return nextValue;
  }

  /**
   * Determines eligibility for a bump to gem value. If ineligible, or if the bump fails,
   * the same value provided is returned
   *
   * @param  {number} currentValue
   */
  private checkForBump(currentValue: number): number {
    let nextValue = currentValue;
    if (this.nthGem % this.bumpEvery === 0) {
      nextValue = this.bumpGemValue(nextValue);
    }
    return nextValue;
  }

  /**
   * Assuming a number of gems as provided, determines the number of gems eligible to
   * "bump up" to a greater value: expressed as "every Nth gem."
   *
   * @param  {number} gemCount
   */
  private deriveBumpEvery(gemCount: number): void {
    if (gemCount >= 50) {
      this.bumpEvery = 10;
    } else if (gemCount >= 10) {
      this.bumpEvery = 5;
    } else {
      this.bumpEvery = 1;
    }
  }

  /** Generates a new gem with calculated value */
  private generateGem(): ValueablesResult {
    const gem = new ValueablesResult({
      quantity: 1,
      value: this.generateGemValue(),
    } as ValueablesResult);
    gem.name = `Gem (${gem.value} ${gem.denomination})`;
    return gem;
  }

  /** Generates a calculated gem value based on constant probability. */
  private generateGemValue(): number {
    const roll: number = rollDice(this.d100);
    let returnValue: number = -1;
    for (const key of this.GEM_VALUE_THRESHOLDS.keys()) {
      if (roll <= key) {
        returnValue = this.GEM_VALUE_THRESHOLDS.get(key) as number;
        break;
      }
    }
    returnValue = this.checkForBump(returnValue);
    if (returnValue === -1) {
      throw new Error(`No gem value threshold found for roll ${roll}`);
    } else {
      return returnValue;
    }
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
        switch (entry.persistenceType) {
          case this.PERSISTENCE_TYPES.magicItemTable:
            result.push(
              ...this.generateMagicItemFromTable(item as ReferenceEntryTable)
            );
            break;
          case this.PERSISTENCE_TYPES.magicItem:
            result.push(item as MagicItem);
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
    return ''.concat(
      `${this.decimalPipe.transform(result.quantity, '1.0')}`,
      ' ',
      result.name.includes('-')
        ? result.name.split('-')[result.name.split('-').length - 1]
        : result.name
    );
  }
}
