import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { DiceRolled } from '../utility/dice-rolled.model';

export abstract class AbstractRollableTable {
  /** The dice pool for generating items on this table: default d% */
  diceToRoll: DiceRolled = new DiceRolled();
  /** Human readable identifier for the magic item table. */
  name: string = '';
  /** Game system for which the table is designed. */
  system: SUPPORTED_SYSTEMS = '' as SUPPORTED_SYSTEMS;

  /** Collection of items eligible to roll as results on this table */
  abstract entries: any[];

  constructor(table?: any) {
    constructInstance(this, table);
  }
}
