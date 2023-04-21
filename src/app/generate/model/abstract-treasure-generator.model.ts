import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureMap } from '@shared/model/treasure/treasure-map.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { TreasureMapResult } from './treasure-map-result.model';
import { ValueablesResult } from './valuables-result.model';

export abstract class AbstractTreasureGenerator {
  private readonly TREASURE_ARTICLE_TYPES = TREASURE_ARTICLE_TYPES;

  protected readonly d100 = new DiceRolled({ pips: 100 });

  private returnResult: TreasureResult[];

  abstract generateGems(article: TreasureArticle): ValueablesResult[] | null;
  abstract generateJewelry(article: TreasureArticle): ValueablesResult[] | null;
  abstract generateTreasureMap(map: TreasureMap): TreasureMapResult | null;

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
    this.returnResult = [];
    for (const article of treasureType.entries) {
      switch ((this.TREASURE_ARTICLE_TYPES as any)[article.type]) {
        case this.TREASURE_ARTICLE_TYPES.GEMS:
          this.pushToResults(this.generateGems(article));
          break;
        case this.TREASURE_ARTICLE_TYPES.JEWELRY:
          this.pushToResults(this.generateJewelry(article));
          break;
        case this.TREASURE_ARTICLE_TYPES.MAGIC_ITEM:
          throw new Error(`${article.type} not yet implemented`);
          break;
        case this.TREASURE_ARTICLE_TYPES.SPECIE:
          this.pushToResults(this.generateSpecie(article));
          break;
        case this.TREASURE_ARTICLE_TYPES.TREASURE_MAP:
          throw new Error(`${article.type} not yet implemented`);
          break;
        default:
          throw new Error(`Unsupported type ${article.type}`);
      }
    }
    return this.returnResult;
  }

  generateTreasureByArticleType(article: TreasureArticle): TreasureResult[] {
    this.returnResult = [];
    switch ((this.TREASURE_ARTICLE_TYPES as any)[article.type]) {
      case this.TREASURE_ARTICLE_TYPES.GEMS:
        this.pushToResults(this.generateGems(article));
        break;
      case this.TREASURE_ARTICLE_TYPES.JEWELRY:
        this.pushToResults(this.generateJewelry(article));
        break;
      case this.TREASURE_ARTICLE_TYPES.MAGIC_ITEM:
        throw new Error(`${article.type} not yet implemented`);
        break;
      case this.TREASURE_ARTICLE_TYPES.SPECIE:
        this.pushToResults(this.generateSpecie(article));
        break;
      case this.TREASURE_ARTICLE_TYPES.TREASURE_MAP:
        throw new Error(`${article.type} not yet implemented`);
        break;
      default:
        throw new Error(`Unsupported type ${article.type}`);
    }
    return this.returnResult;
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
