import { constructInstance } from '@shared/utilities/common-util/common.util';
import { TreasureArticle } from '../treasure/treasure-article.model';
import { TreasureType } from '../treasure/treasure-type.model';

export class DataState {
  treasureArticles: TreasureArticle[] = [];
  treasureTypes: TreasureType[] = [];

  constructor(state?: any) {
    constructInstance(this, state);
  }
}
