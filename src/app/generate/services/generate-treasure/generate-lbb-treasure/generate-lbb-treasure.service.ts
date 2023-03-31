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
  private readonly GEM_VALUE_THRESHOLDS: Map<number, number> = new Map([
    [10, 10],
    [25, 50],
    [75, 100],
    [90, 500],
    [100, 1000],
  ]);

  private gemResult: ValueablesResult[];

  constructor() {
    super();
  }

  generateGems(article: TreasureArticle): ValueablesResult[] | null {
    if (rollDice(article.diceRolled) <= article.chanceOf) {
      this.gemResult = [];

      // determine number of GEMS
      let gemCount: number = rollDice(article.quantity as DiceRolled);

      // for each gem, roll value
      let gem: ValueablesResult;
      for (let i = 0; i < gemCount; i++) {
        gem = new ValueablesResult({
          quantity: 1,
          value: this.generateGemValue(),
        } as ValueablesResult);
        gem.name = `Gem (${gem.value} ${gem.denomination})`;
        this.addOrIncrement(gem);
      }

      this.gemResult.sort((a, b) => a.value - b.value);
      return this.gemResult;

      // @TODO do bumping
    }
    return null;
  }

  /**
   * If no gem of the present value is detected in the active result response, adds this
   * to it. If at least one result is present already, increments the pre-existing set.
   *
   * @param  {ValueablesResult} gem
   */
  private addOrIncrement(gem: ValueablesResult): void {
    const gemIndex: number = this.gemResult.findIndex(
      (g) => g.value === gem.value
    );
    if (gemIndex == -1) {
      this.gemResult.push(gem);
    } else {
      this.gemResult[gemIndex].quantity += gem.quantity;
    }
  }

  /** Generates a random value based on constant probability. */
  private generateGemValue(): number {
    const roll: number = rollDice(this.d100);
    for (const key of this.GEM_VALUE_THRESHOLDS.keys()) {
      if (roll <= key) {
        return this.GEM_VALUE_THRESHOLDS.get(key) as number;
      }
    }
    throw new Error(`No gem value threshold found for roll ${roll}`);
  }
}
