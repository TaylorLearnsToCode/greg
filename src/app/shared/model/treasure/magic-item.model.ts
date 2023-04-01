import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import {
  constructInstance,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { TreasureArticle } from './treasure-article.model';

/** Representation of a magical item */
export class MagicItem extends TreasureArticle {
  /** Functions, descriptions, or other notes regarding the item. */
  notes: string = '';

  constructor(item?: any) {
    super();
    if (doesExist(item)) {
      item.type = TREASURE_ARTICLE_TYPES.MAGIC_ITEM;
    }
    constructInstance(this, item);
  }
}
