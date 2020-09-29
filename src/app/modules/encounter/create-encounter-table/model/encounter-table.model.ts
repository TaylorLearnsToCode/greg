import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Encounter } from './encounter.model';

/**
 * A collection of Encounter elements which may come into contact with a party
 * in addition to the dice pools rolled to determine which Encounter occurs.
 */
export class EncounterTable {
  diceRolled: DiceRolled[];
  encounters: Encounter[];

  constructor(diceRolled?: DiceRolled[], encounters?: Encounter[]) {
    this.diceRolled = doesExist(diceRolled) ? diceRolled : [];
    this.encounters = doesExist(encounters) ? encounters : [];
  }
}

export enum EncounterTableActions {
  UPDATE_DICE_ROLLED,
  UPDATE_ENCOUNTERS,
}

export interface IEncounterTableAction {
  action: EncounterTableActions;
  payload?: any;
}
