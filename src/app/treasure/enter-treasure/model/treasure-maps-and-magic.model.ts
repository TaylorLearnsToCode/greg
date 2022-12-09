import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';
import { GemRollResult } from './treasure-gems.model';
import { JewelRollResult } from './treasure-jewelry.model';

export class MapsAndMagicResult {
  items: MagicItem[] = [];
  treasureMaps: TreasureMapResult[] = [];
  magicMaps: MagicItemMapResult[] = [];
}

export class TreasureMapResult {
  name: string = '';
  silver: number = 0;
  gold: number = 0;
  gems: GemRollResult = new GemRollResult();
  jewelry: JewelRollResult = new JewelRollResult();
}

export class MagicItemMapResult {
  numberOf: number = 0;
  items: MagicItem[] = [];
}
