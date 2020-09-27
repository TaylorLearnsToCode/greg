import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Encounter } from './encounter.model';

export class EncounterTable {
  diceRolled: DiceRolled[] = [];
  encounters: Encounter[] = [];
}

export enum EncounterTableActions {
  UPDATE_DICE_ROLLED,
}

export interface IEncounterTableAction {
  action: EncounterTableActions;
  payload?: any;
}
