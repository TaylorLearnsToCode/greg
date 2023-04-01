import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { DiceRolled } from '../utility/dice-rolled.model';
import { TreasureArticle } from './treasure-article.model';

/** Representation of a magical item */
export class MagicItem extends TreasureArticle {
  /** Functions, descriptions, or other notes regarding the item. */
  notes: string = '';

  constructor(item?: any) {
    super();
    this.quantity = new DiceRolled({ pips: 1 });
    constructInstance(this, item);
    this.type = TREASURE_ARTICLE_TYPES.MAGIC_ITEM;
  }
}
