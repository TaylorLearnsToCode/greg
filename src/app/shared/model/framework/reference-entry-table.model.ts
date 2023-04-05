import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { AbstractRollableTable } from './abstract-rollable-table.model';

/** A collection of ReferenceEntries which can be rolled against to generate one or more results. */
export class ReferenceEntryTable extends AbstractRollableTable {
  /** References to items in memory corresponding to possible table results */
  entries: ReferenceEntry[] = [];

  constructor(table?: any) {
    super(table);
    this.massageEntries(table);
  }

  /**
   * If the argument table is present, checks for referenc entries. If found,
   * ensures they are initialized as ReferenceEntry, not plain JSON objects
   *
   * @param  {any} table optional
   */
  private massageEntries(table?: any): void {
    if (table?.entries?.length) {
      for (let i = 0; i < table.entries.length; i++) {
        table.entries[i] = new ReferenceEntry(table.entries[i]);
      }
      this.entries = table.entries;
    }
  }
}
