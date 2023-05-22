import { Injectable } from '@angular/core';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root'
})
export class BxGemsService {

  /** One six sided die */
  private readonly d6 = new DiceRolled();
  /** One percentile die */
  private readonly d20 = new DiceRolled({ pips: 20 });

  /* Numbers on a d20, mapped to gem value.
  Must subtract 1 from rolls, (zero indexed array) */
  private GEM_ROLL_TABLE: number[] = [
    10, 10, 10, 10, 50, 50, 50, 50, 50, 100, 100, 100, 100, 100, 100, 500, 500, 500, 500, 1000,
  ]
  /* Holds generated gem values for return */
  private gemResult: ValueablesResult[];
  constructor() { }

  /**
    * Returns a collection of ValueablesResults, as rolled according to a provided configuration.
    *
    * @param  {TreasureArticle} article
    */
  generateGems(article: TreasureArticle): ValueablesResult[] | null {
    if (rollDice(article.diceRolled) <= article.chanceOf) {
      this.gemResult = [];
      const gemCount: number = rollDice(article.quantity as DiceRolled);

      let gem: ValueablesResult;
      for (let i = 0; i < gemCount; i++) {
        gem = this.generateGem();
        this.gemResult.push(gem)
      }

      this.gemResult.sort((a, b) => a.value - b.value);
      return this.gemResult;
    }
    return null;
  }

  generateGem(): ValueablesResult {
    const gem = new ValueablesResult({
      quantity: 1,
      value: this.generateGemValue()
    } as ValueablesResult)
    gem.name = `Gem (${gem.value} ${gem.denomination})`;
    return gem;
  }

  generateGemValue(): number {
    const roll = rollDice(this.d20)
    return this.GEM_ROLL_TABLE[roll - 1] //Zero indexed Array
  }
}