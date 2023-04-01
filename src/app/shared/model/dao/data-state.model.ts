import { constructInstance } from '@shared/utilities/common-util/common.util';
import { MagicItem } from '../treasure/magic-item.model';
import { TreasureArticle } from '../treasure/treasure-article.model';
import { TreasureType } from '../treasure/treasure-type.model';

export class DataState {
  magicItems: MagicItem[] = [];
  treasureArticles: TreasureArticle[] = [];
  treasureTypes: TreasureType[] = [];

  constructor(state?: any) {
    constructInstance(this, state);
  }
}
