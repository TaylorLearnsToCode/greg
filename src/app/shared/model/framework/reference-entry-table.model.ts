import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { ReferenceEntry } from '@shared/model/dao/reference-entry.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';

/** A collection of ReferenceEntries which can be rolled against to generate one or more results. */
export class ReferenceEntryTable {
  /** The dice pool for generating items on this table: default d% */
  diceToRoll: DiceRolled = new DiceRolled({ pips: 100 });
  /** References to items in memory corresponding to possible table results */
  entries: ReferenceEntry[] = [];
  /** Human readable identifier for the magic item table. */
  name: string = '';
  /** Game system for which the table is designed. */
  system: SUPPORTED_SYSTEMS = '' as SUPPORTED_SYSTEMS;

  constructor(table?: any) {
    this.massageEntries(table);
    constructInstance(this, table);
  }

  /**
   * If the argument table is present, checks for referenc entries. If found,
   * ensures they are initialized as ReferenceEntry, not plain JSON objects
   *
   * @param  {any} table optional
   */
  private massageEntries(table?: any): void {
    if (table != undefined && table.entries.length) {
      for (let i = 0; i < table.entries.length; i++) {
        table.entries[i] = new ReferenceEntry(table.entries[i]);
      }
    }
  }
}
