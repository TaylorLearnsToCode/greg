import { LAbstractTable } from './legacy-abstract-table.model';
import { LMagicItemTableEntry } from './legacy-magic-item-table-entry.model';

export class LMagicItemTable extends LAbstractTable {
  entries: LMagicItemTableEntry[] = [];
}
