import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { ReferenceEntry } from '../dao/reference-entry.model';
import { DiceRolled } from '../utility/dice-rolled.model';

/** A collection of magic items which can be rolled against to generate one or more. */
export class MagicItemTable {
  /** The dice pool for generating items on this table: default d% */
  diceToRoll: DiceRolled = new DiceRolled({ pips: 100 });
  /** References to items in memory corresponding to possible table results */
  entries: ReferenceEntry[] = [];
  /** Human readable identifier for the magic item table. */
  name: string = '';
  /** Game system for which the table is designed. */
  system: SUPPORTED_SYSTEMS = '' as SUPPORTED_SYSTEMS;

  constructor(table?: any) {
    constructInstance(this, table);
  }
}
