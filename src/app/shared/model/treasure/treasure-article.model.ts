import {
  constructInstance,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { Rollable } from '../framework/rollable.model';
import { DiceRolled } from '../utility/dice-rolled.model';

/** One article of treasure: one column in a Treasure Type to be filled out. */
export class TreasureArticle extends Rollable {
  /** Human readable identifier for the article */
  name: string = '';
  /** The number - expressed as a dice pool - of the article; accepts integer, as well */
  quantity: DiceRolled | number = new DiceRolled();

  constructor(article?: any) {
    super();
    this.convertNumberQuantity(article);
    constructInstance(this, article);
  }

  /**
   * If a provided article, assumed to resemble a TreasureArticle, has a number
   * "quantity" property, converts the property to a dice pool which will
   * always roll exactly that number.
   *
   * @param  {any} article
   */
  private convertNumberQuantity(article: any): void {
    if (doesExist(article?.quantity) && !doesExist(article?.quantity?.pips)) {
      article.quantity = new DiceRolled({
        pips: 1,
        multiplier: article.quantity,
      } as DiceRolled);
    }
  }
}
