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
export class LbbJewelsService {
  /** One percentile die */
  private readonly d100 = new DiceRolled({ pips: 100 });
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

  /** Response object built and returned by the generate jewelry function */
  private jewelResult: ValueablesResult[];

  constructor() {}

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
        addOrIncrementValuable(jewel, this.jewelResult);
      }

      this.jewelResult.sort((a, b) => a.value - b.value);
      return this.jewelResult;
    }
    return null;
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
      throwError(`No jewelry value threshold found for roll ${roll}`);
    }
    return returnValue;
  }
}
