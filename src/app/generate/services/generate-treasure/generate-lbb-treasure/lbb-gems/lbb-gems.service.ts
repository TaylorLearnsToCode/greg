import { Injectable } from '@angular/core';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { addOrIncrementValuable } from '@generate/utilities/treasure-util/treasure.util';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';

@Injectable({
  providedIn: 'root',
})
export class LbbGemsService {
  /** One six sided die */
  private readonly d6 = new DiceRolled();
  /** One percentile die */
  private readonly d100 = new DiceRolled({ pips: 100 });

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

  /** The number of gems sequentially eligible for a "bump" - expressed as the Nth gem processed */
  private bumpEvery: number;
  /** Response object built and returned by the generate gems function */
  private gemResult: ValueablesResult[];
  /** The Nth gem under processing: one greater than the index of the current gem in the gem iterator */
  private nthGem: number;

  constructor() {}

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
        addOrIncrementValuable(gem, this.gemResult);
      }

      this.gemResult.sort((a, b) => a.value - b.value);
      return this.gemResult;
    }
    return null;
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
      throwError(`No gem value threshold found for roll ${roll}`);
    }
    return returnValue;
  }
}
