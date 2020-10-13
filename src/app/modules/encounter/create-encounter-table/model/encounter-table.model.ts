import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Encounter } from './encounter.model';

/**
 * A collection of Encounter elements which may come into contact with a party
 * in addition to the dice pools rolled to determine which Encounter occurs.
 */
export class EncounterTable {
  /** The pool of dice to be rolled to determine an encounter on this table. */
  diceRolled: DiceRolled[];
  /** The collection of encounters potentially encounterable on this table. */
  encounters: Encounter[];
  /** The title or name uniquely identifying this encounter table. */
  title: string;

  /**
   * Encounter Table Constructor
   * @param  {DiceRolled[]} diceRolled? Defaults to []
   * @param  {Encounter[]} encounters? Defaults to []
   * @param  {string} title? Defaults to 'Encounter Table'
   */
  constructor(
    diceRolled?: DiceRolled[],
    encounters?: Encounter[],
    title?: string
  ) {
    this.diceRolled = doesExist(diceRolled) ? diceRolled : [];
    this.encounters = doesExist(encounters) ? encounters : [];
    this.title = doesExist(title) ? title : 'Encounter Table';
  }
}

/** Supported actions emittable to the Create Encounter Facade service. */
export enum EncounterTableActions {
  /** Export the table in payload to the client in JSON format. */
  EXPORT_JSON,
  /** Update the diceRolled pool. */
  UPDATE_DICE_ROLLED,
  /** Update the encounters list. */
  UPDATE_ENCOUNTERS,
  /** Update the entire table. */
  UPDATE_TABLE,
}

/** Interface contract for emitted EncounterTableActions events. */
export interface IEncounterTableAction {
  /** The action to take. */
  action: EncounterTableActions;
  /** Optional DTO containing data supporting processing of the defined action. */
  payload?: any;
}
