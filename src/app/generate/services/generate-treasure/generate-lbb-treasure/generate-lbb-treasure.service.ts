import { Injectable } from '@angular/core';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
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

  /** The number of gems sequentially eligible for a "bump" - expressed as the Nth gem processed */
  private bumpEvery: number;
  /** Response object built and returned by the generate gems function */
  private gemResult: ValueablesResult[];
  /** Response object built and returned by the generate jewelry function */
  private jewelResult: ValueablesResult[];
  /** The Nth gem under processing: one greater than the index of the current gem in the gem iterator */
  private nthGem: number;

  constructor() {
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

  /** Generates a new article of jewelry with calculated value */
  private generateJewel(): ValueablesResult {
    const jewel = new ValueablesResult({
      value: this.generateJewelryValue(),
      quantity: 1,
    } as ValueablesResult);
    jewel.name = `Jewelry (${jewel.value} ${jewel.denomination})`;
    return jewel;
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
}