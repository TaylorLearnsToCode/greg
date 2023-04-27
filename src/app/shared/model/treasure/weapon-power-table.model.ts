import { doesExist } from '@shared/utilities/common-util/common.util';
import { AbstractRollableTable } from '../framework/abstract-rollable-table.model';
import { ReferenceEntry } from '../framework/reference-entry.model';

export class WeaponPowerTable extends AbstractRollableTable {
  entries: ReferenceEntry[] = [];

  constructor(table?: any) {
    super(table);
    this.handleEntries(table);
  }

  private handleEntries(table?: any): void {
    if (doesExist(table) && doesExist(table.entries)) {
      this.entries.push(
        ...(table.entries as ReferenceEntry[]).map(
          (entry) => new ReferenceEntry(entry)
        )
      );
    }
  }
}
