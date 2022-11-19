import { BoundedRange } from '@shared/model/bounded-range.model';

/** Base class for magic items, maps, or other equivalent articles of treasure. */
export class MagicItem {
  name: string = '';
  description: string = '';
}

/** Result entry for tables of magic items against which percentile rolls can be made. */
export class MagicItemTableEntry {
  /** The percentile chance of encountering this item. Valid range is 1 to 100. */
  chanceOf: BoundedRange = new BoundedRange();
  entry: MagicItem = new MagicItem();
}

/** Model class for a table of magic items on which percentile rolls can be made. */
export class MagicItemTable {
  name: string = '';
  entries: MagicItemTableEntry[] = [];
}

/** Model class for a nested table of magic items against which percentile rolls can be made. */
export class NestedMagicItemTable {
  name: string = '';
  entries: Array<MagicItemTable | NestedMagicItemTable> = [];
}
