import { EncounterTable } from './encounter-table.model';

/** Interface contract for elements making up the Create Encounter component's state. */
export interface ICreateEncounterViewState {
  /** The value of the currently defined EncounterTable. */
  encounterTable: EncounterTable;
}
