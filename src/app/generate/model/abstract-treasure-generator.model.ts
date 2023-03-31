import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { TreasureResult } from './treasure-result.model';
import { ValueablesResult } from './valuables-result.model';

export abstract class AbstractTreasureGenerator {
  private readonly TREASURE_ARTICLE_TYPES = TREASURE_ARTICLE_TYPES;

  protected readonly d100 = new DiceRolled({ pips: 100 });

  private returnResult: TreasureResult[];

  abstract generateGems(article: TreasureArticle): ValueablesResult[] | null;

  generateTreasureByType(treasureType: TreasureType): TreasureResult[] {
    this.returnResult = [];
    let nextResult: TreasureResult | null;
    for (const article of treasureType.entries) {
      switch ((this.TREASURE_ARTICLE_TYPES as any)[article.type]) {
        case this.TREASURE_ARTICLE_TYPES.GEMS:
          this.pushToResults(this.generateGems(article));
          break;
        case this.TREASURE_ARTICLE_TYPES.SPECIE:
          this.pushToResults(this.generateSpecie(article));
          break;
        default:
          throw new Error(`Unsupported type ${article.type}`);
      }
    }
    return this.returnResult;
  }

  /**
   * For a given specie type treasure article, returns the appropriate treasure result.
   *
   * @param  {TreasureArticle} specie
   * @returns TreasureResult, if roll succeeds; NULL if no specie is rolled.
   */
  private generateSpecie(specie: TreasureArticle): TreasureResult | null {
    if (rollDice(this.d100) <= specie.chanceOf) {
      const result = new TreasureResult({
        name: specie.name,
      } as TreasureResult);
      result.quantity = rollDice(specie.quantity as DiceRolled);
      return result;
    }
    return null;
  }

  /**
   * Assigns all of the results in a provided results array to the array to be returned from
   * the generate function. If the argument is NULL, it will add nothing.
   *
   * @param  {TreasureResult[]|null} result
   */
  private pushToResults(result: TreasureResult[] | null): void;
  /**
   * Assigns a given treasure result to the array to be returned from the generate function.
   * If the argument is NULL, it will add nothing.
   *
   * @param  {TreasureResult|null} result
   */
  private pushToResults(result: TreasureResult | null): void;
  private pushToResults(result: any): void {
    if (result == null) {
      return;
    } else if (Array.isArray(result)) {
      for (const entry of result) {
        this.pushToResults(entry);
      }
    } else {
      this.returnResult.push(result);
    }
  }
}
