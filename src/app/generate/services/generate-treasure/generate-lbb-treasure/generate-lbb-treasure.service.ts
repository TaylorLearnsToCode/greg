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
import { WeaponPowerTable } from '@shared/model/treasure/weapon-power-table.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
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
  /** One twelve sided die */
  private readonly d12 = new DiceRolled({ pips: 12 });
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
  /** Persisted data types supported by GREG */
  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  /** Alignment map for swords */
  private readonly SWORD_ALIGNMENTS: Map<BoundedRange, string> = new Map([
    [new BoundedRange({ low: 1, high: 65 }), 'Lawful'],
    [new BoundedRange({ low: 66, high: 90 }), 'Neutral'],
    [new BoundedRange({ low: 91, high: 100 }), 'Chaotic'],
  ]);
  /** Modes by which magic swords communicate */
  private readonly SWORD_COMMUNICATION_MODES: Map<BoundedRange, string> =
    new Map([
      [new BoundedRange({ low: 1, high: 6 }), 'None'],
      [new BoundedRange({ low: 7, high: 9 }), 'Empathy'],
      [new BoundedRange({ low: 10, high: 11 }), 'Speech'],
      [new BoundedRange({ low: 12, high: 12 }), 'Telepathy'],
    ]);
  /** Map by dice rolled how many languages a magic sword will know */
  private readonly SWORD_LANGUAGES_KNOWN: Map<BoundedRange, number> = new Map([
    [new BoundedRange({ low: 0, high: 0 }), 0],
    [new BoundedRange({ low: 1, high: 50 }), 1],
    [new BoundedRange({ low: 51, high: 70 }), 2],
    [new BoundedRange({ low: 71, high: 85 }), 3],
    [new BoundedRange({ low: 86, high: 95 }), 4],
    [new BoundedRange({ low: 96, high: 99 }), 5],
  ]);

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
   * If a provided string name contains the text "Sword" - case sensitive - will generate
   * and append in (parentheses) intelligent qualities for the sword, returning the
   * combined result.
   *
   * @param  {string} name
   */
  private appendSwordIntelligence(name: string): string {
    let newName: string = name;

    if (newName.includes('Sword') && !newName.includes('Map to')) {
      let alignment: string = '';
      const roll: number = rollDice(this.d100);
      for (const swordAlignment of this.SWORD_ALIGNMENTS.keys()) {
        if (isBetween(roll, swordAlignment)) {
          alignment = this.SWORD_ALIGNMENTS.get(swordAlignment) as string;
          break;
        }
      }

      // @TODO next - configure sword powers as persisted rollable table entry
      const swordIntelligence = rollDice(this.d12);
      let communicationMode: string = '';
      for (const mode of this.SWORD_COMMUNICATION_MODES.keys()) {
        if (isBetween(swordIntelligence, mode)) {
          communicationMode = this.SWORD_COMMUNICATION_MODES.get(
            mode
          ) as string;
          break;
        }
      }

      newName += ''.concat(
        ` (Alignment: ${alignment}`,
        swordIntelligence > 6 ? `; Intelligence: ${swordIntelligence}` : '',
        swordIntelligence > 6
          ? `; Communication Mode: ${communicationMode}`
          : '',
        this.appendSwordLanguages(swordIntelligence),
        this.appendSwordPowers(swordIntelligence),
        ')'
      );
    }
    return newName;
  }

  /**
   * Generates the number of languages a sword should know and returns a string
   * indicating as such.
   *
   * @param  {number} intelligence
   */
  private appendSwordLanguages(intelligence: number): string {
    if (intelligence < 10) {
      return '';
    }
    let noLanguages = this.determineSwordLanguages();
    if (noLanguages === -1) {
      noLanguages++;
      for (let i = 0; i < 2; i++) {
        noLanguages += this.determineSwordLanguages(
          new DiceRolled({ pips: 100, modifier: -1 })
        );
      }
    }
    return `; Languages Spoken: ${noLanguages}`;
  }

  /**
   * Based on provided intelligence, returns a joined list of special sword powers.
   *
   * @param  {number} swordIntelligence
   */
  private appendSwordPowers(swordIntelligence: number): string {
    const powers: string[] = [];

    const primaryPowers: WeaponPowerTable =
      this.dataService.retrieveReference<WeaponPowerTable>(
        'Primary Powers',
        this.PERSISTENCE_TYPES.magicWeaponPowerTable
      );
    const extraordinaryPowers: WeaponPowerTable =
      this.dataService.retrieveReference<WeaponPowerTable>(
        'Extraordinary Ability Table',
        this.PERSISTENCE_TYPES.magicWeaponPowerTable
      );

    let noPowers: number = 0;
    switch (swordIntelligence) {
      case 12:
        noPowers = 3;
        powers.push(...this.rollOnWeaponPowerTable(extraordinaryPowers));
        break;
      case 11:
        noPowers = 3;
        powers.push('Read Magic');
        break;
      case 10:
        noPowers = 3;
        break;
      case 9:
        noPowers = 3;
        break;
      case 8:
        noPowers = 2;
        break;
      case 7:
        noPowers = 1;
        break;
      default:
        break;
    }
    powers.push(...this.rollOnWeaponPowerTable(primaryPowers, noPowers));

    return powers.length ? `; Special Powers: ${powers.join(', ')}` : '';
  }

  /**
   * Rolls on a provided WeaponPowerTable a provided number of times, returning a collection
   * of the references generated in the process.
   *
   * @param  {WeaponPowerTable} table
   * @param  {number} times Optional - default 1
   */
  private rollOnWeaponPowerTable(
    table: WeaponPowerTable,
    times?: number
  ): string[] {
    times = doesExist(times) ? times : 1;
    const response: string[] = [];

    let roll: number;
    for (let i = 0; i < (times as number); i++) {
      roll = rollDice(table.diceToRoll);
      for (const entry of table.entries) {
        if (isBetween(roll, entry.chanceOf)) {
          switch (entry.persistenceType) {
            case this.PERSISTENCE_TYPES.magicWeaponPower:
              response.push(entry.reference);
              break;
            case this.PERSISTENCE_TYPES.magicWeaponPowerTable:
              response.push(
                ...this.rollOnWeaponPowerTable(
                  this.dataService.retrieveReference<WeaponPowerTable>(
                    entry.reference,
                    entry.persistenceType
                  )
                )
              );
              break;
            default:
              throw new Error(
                `Unsupported persistence type ${entry.persistenceType} encountered`
              );
          }
        }
      }
    }

    return response;
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
   * For any object with a "name" or, optionally, "quantity" property, converts said object
   * into a TreasureResult.
   *
   * @param  {any} namedItem
   */
  private convertNamedItemToTreasureResult(namedItem: any): TreasureResult {
    const treasureResult = new TreasureResult({
      name: this.appendSwordIntelligence(namedItem.name),
    });
    if (doesExist(namedItem.quantity)) {
      treasureResult.quantity = (namedItem.quantity as DiceRolled).pips
        ? rollDice(namedItem.quantity as DiceRolled)
        : (namedItem.quantity as number);
    }
    return treasureResult;
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

  /**
   * Rolls a number of languages, as configured, for a sword to know.
   * Returns -1 if no number is found to correspond with the die roll.
   *
   * @param  {DiceRolled} die Optional - default 1d%
   */
  private determineSwordLanguages(die?: DiceRolled): number {
    const roll: number = rollDice(die ? die : this.d100);
    let languages: number = -1;
    for (const no of this.SWORD_LANGUAGES_KNOWN.keys()) {
      if (isBetween(roll, no)) {
        languages = this.SWORD_LANGUAGES_KNOWN.get(no) as number;
        break;
      }
    }
    return languages;
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
