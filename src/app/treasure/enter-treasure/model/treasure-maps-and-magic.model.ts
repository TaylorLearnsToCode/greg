import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';
import {
  MagicItemMap,
  TreasureMap,
} from '@treasure/treasure-common/model/treasure-map.model';

export class MapsAndMagicResult {
  items: MagicItem[] = [];
  treasureMaps: TreasureMap[] = [];
  magicMaps: MagicItemMap[] = [];
}
