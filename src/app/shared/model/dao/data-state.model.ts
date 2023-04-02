import { constructInstance } from '@shared/utilities/common-util/common.util';
import { MagicItemTable } from '../treasure/magic-item-table.model';
import { MagicItem } from '../treasure/magic-item.model';
import { TreasureArticle } from '../treasure/treasure-article.model';
import { TreasureType } from '../treasure/treasure-type.model';

export class DataState {
  magicItems: MagicItem[] = [];
  magicItemTables: MagicItemTable[] = [];
  treasureArticles: TreasureArticle[] = [];
  treasureTypes: TreasureType[] = [];

  constructor(state?: any) {
    constructInstance(this, state);
  }
}
