import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { MonsterType } from '../monster/monster-type.model';
import { MagicItem } from '../treasure/magic-item.model';
import { TreasureArticle } from '../treasure/treasure-article.model';
import { TreasureType } from '../treasure/treasure-type.model';

export class DataState {
  magicItems: MagicItem[] = [];
  magicItemTables: ReferenceEntryTable[] = [];
  magicWeaponPowers: ReferenceEntryTable[] = [];
  magicWeaponPowerTables: ReferenceEntryTable[] = [];
  monsterEncounterLists: ReferenceEntryTable[] = [];
  monsterTypes: MonsterType[] = [];
  treasureArticles: TreasureArticle[] = [];
  treasureMapRefs: TreasureArticle[] = [];
  treasureMaps: ReferenceEntryTable[] = [];
  treasureTypes: TreasureType[] = [];

  constructor(state?: any) {
    constructInstance(this, state);
  }
}
