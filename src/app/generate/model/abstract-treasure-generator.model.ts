import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { TreasureMapResult } from './treasure-map-result.model';
import { ValueablesResult } from './valuables-result.model';

export abstract class AbstractTreasureGenerator {
  protected readonly d100 = new DiceRolled({ pips: 100 });
  protected readonly TREASURE_ARTICLE_TYPES = TREASURE_ARTICLE_TYPES;

  abstract generateGems(article: TreasureArticle): ValueablesResult[] | null;
  abstract generateJewelry(article: TreasureArticle): ValueablesResult[] | null;
  abstract generateMagicItem(item: TreasureArticle): TreasureResult[] | null;
  abstract generateTreasureMap(
    article: TreasureArticle
  ): TreasureResult[] | null;
  abstract generateTreasureMapResult(
    map: ReferenceEntryTable
  ): TreasureMapResult | null;

  /**
   * For a given specie type treasure article, returns the appropriate treasure result.
   *
   * @param  {TreasureArticle} specie
   * @returns TreasureResult, if roll succeeds; NULL if no specie is rolled.
   */
  generateSpecie(specie: TreasureArticle): TreasureResult | null {
    if (rollDice(this.d100) <= specie.chanceOf) {
      const result = new TreasureResult({
        name: specie.name,
      } as TreasureResult);
      result.quantity = rollDice(specie.quantity as DiceRolled);
      return result;
    }
    return null;
  }

  generateTreasureByTreasureType(treasureType: TreasureType): TreasureResult[] {
    const returnResult: TreasureResult[] = [];
    for (const article of treasureType.entries) {
      returnResult.push(...this.generateTreasureByArticleType(article));
    }
    return returnResult;
  }

  generateTreasureByArticleType(article: TreasureArticle): TreasureResult[] {
    const returnResult: TreasureResult[] = [];
    switch ((this.TREASURE_ARTICLE_TYPES as any)[article.type]) {
      case this.TREASURE_ARTICLE_TYPES.GEMS:
        this.pushToResults(this.generateGems(article), returnResult);
        break;
      case this.TREASURE_ARTICLE_TYPES.JEWELRY:
        this.pushToResults(this.generateJewelry(article), returnResult);
        break;
      case this.TREASURE_ARTICLE_TYPES.MAGIC_ITEM:
        this.pushToResults(this.generateMagicItem(article), returnResult);
        break;
      case this.TREASURE_ARTICLE_TYPES.SPECIE:
        this.pushToResults(this.generateSpecie(article), returnResult);
        break;
      case this.TREASURE_ARTICLE_TYPES.TREASURE_MAP:
        this.pushToResults(this.generateTreasureMap(article), returnResult);
        break;
      default:
        throwError(`Unsupported type ${article.type}`);
    }
    return returnResult;
  }

  /**
   * Assigns all of the results in a provided results array to the array to be returned from
   * the generate function. If the argument is NULL, it will add nothing.
   *
   * @param  {TreasureResult[]|null} result A list of results to be added
   * @param  {TreasureResult[]} addList The list to which the results should be added
   */
  private pushToResults(
    result: TreasureResult[] | null,
    addList: TreasureResult[]
  ): void;
  /**
   * Assigns a given treasure result to the array to be returned from the generate function.
   * If the argument is NULL, it will add nothing.
   *
   * @param  {TreasureResult|null} result A result to be added
   * @param  {TreasureResult[]} addList The list to which the results should be added
   */
  private pushToResults(
    result: TreasureResult | null,
    addList: TreasureResult[]
  ): void;
  private pushToResults(result: any, addList: TreasureResult[]): void {
    if (result == null) {
      return;
    } else if (Array.isArray(result)) {
      for (const entry of result) {
        this.pushToResults(entry, addList);
      }
    } else {
      addList.push(result);
    }
  }
}
