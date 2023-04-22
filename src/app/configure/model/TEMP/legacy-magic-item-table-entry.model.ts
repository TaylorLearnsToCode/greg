import { constructInstance } from '@shared/utilities/common-util/common.util';
import { LAbstractTableEntry } from './legacy-abstract-table-entry.model';
import { LAbstractTable } from './legacy-abstract-table.model';
import { LMagicItem } from './legacy-magic-item.model';

export class LMagicItemTableEntry extends LAbstractTableEntry {
  item: LMagicItem | LAbstractTable = new LMagicItem();

  constructor(table?: any) {
    super();
    constructInstance(this, table);
  }
}
