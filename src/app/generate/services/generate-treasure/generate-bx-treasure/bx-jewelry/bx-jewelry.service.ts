import { Injectable } from '@angular/core';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root'
})
export class BxJewelryService {

  private valueDice: DiceRolled = new DiceRolled({no:3, pips: 6})
  private jewelryResult: ValueablesResult[];

  constructor() { }
  generateJewelryPieces(article: TreasureArticle): ValueablesResult[] | null {
    if (rollDice(article.diceRolled) <= article.chanceOf) {
      this.jewelryResult = [];
      const jewelryCount: number = rollDice(article.quantity as DiceRolled);

      let jewelry: ValueablesResult;
      for (let i = 0; i < jewelryCount; i++) {
        jewelry = this.generateJewelry();
        this.jewelryResult.push(jewelry)
      }

      this.jewelryResult.sort((a, b) => a.value - b.value);
      return this.jewelryResult;
    }
    return null;
  }

  generateJewelry(): ValueablesResult {
    const jewelry = new ValueablesResult({
      quantity: 1,
      value: this.generateJewelryValue()
    } as ValueablesResult)
    jewelry.name = `Jewelry (${jewelry.value} ${jewelry.denomination})`;
    return jewelry;
  }

  generateJewelryValue(): number {
    const roll = rollDice(this.valueDice)
    return roll * 100;
  }
}
