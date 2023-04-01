import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import {
  constructInstance,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { DiceRolled } from '../utility/dice-rolled.model';
import { TreasureArticle } from './treasure-article.model';

/** Representation of a magical item */
export class MagicItem extends TreasureArticle {
  /** Functions, descriptions, or other notes regarding the item. */
  notes: string = '';

  constructor(item?: any) {
    super(item);
    this.applyDefaultQuantity(item);
    constructInstance(this, item);
    this.type = TREASURE_ARTICLE_TYPES.MAGIC_ITEM;
  }

  /**
   * For magic items, the default quantity is 1: represented as a dice pool of 1d1
   *
   * @param  {any} item optional
   */
  private applyDefaultQuantity(item?: any): void {
    if (item == undefined || !doesExist(item.quantity)) {
      this.quantity = new DiceRolled({ pips: 1 });
    }
  }
}
