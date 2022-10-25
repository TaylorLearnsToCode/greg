import { CreateEncounterTableAction } from './create-encounter-table-action.enum';

export interface ICreateEncounterTableAction {
  action: CreateEncounterTableAction;
  payload?: any;
}
