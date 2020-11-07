import { CreateEncounterTableActions } from './create-encounter-table-actions.enum';

export interface ICreateEncounterTableAction {
  action: CreateEncounterTableActions;
  payload?: any;
}
