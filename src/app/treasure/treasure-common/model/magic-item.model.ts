import { BoundedRange } from '@shared/model/bounded-range.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { MagicItemMap, TreasureMap } from './treasure-map.model';

/** Base class for magic items, maps, or other equivalent articles of treasure. */
export class MagicItem {
  name: string = '';
  description: string = '';
}

/** Result entry for tables of magic items against which percentile rolls can be made. */
export class MagicItemTableEntry {
  /** The percentile chance of encountering this item. Valid range is 1 to 100. */
  chanceOf: BoundedRange = new BoundedRange();
  entry: MagicItem | TreasureMap | MagicItemMap = new MagicItem();

  constructor(magicItemTableEntry?: MagicItemTableEntry) {
    if (doesExist(magicItemTableEntry)) {
      Object.keys(this).forEach((key) => {
        if (doesExist(magicItemTableEntry[key])) {
          this[key] = magicItemTableEntry[key];
        }
      });
    }
  }
}

/** Model class for a table of magic items on which percentile rolls can be made. */
export class MagicItemTable {
  name: string = '';
  entries: MagicItemTableEntry[] = [];
}

/** Result entry for <i>nested</i> tables of magic items against which percentile rolls can be made. */
export class NestedMagicItemTableEntry {
  /** The percentile chance of encountering this item. Valid range is 1 to 100. */
  chanceOf: BoundedRange = new BoundedRange();
  entry: MagicItemTable | NestedMagicItemTable;
}

/** Model class for a nested table of magic items against which percentile rolls can be made. */
export class NestedMagicItemTable {
  name: string = '';
  entries: NestedMagicItemTableEntry[] = [];
}
