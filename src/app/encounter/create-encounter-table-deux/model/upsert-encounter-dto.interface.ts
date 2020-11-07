import { Encounter } from '@encounter/create-encounter-table-deux/model/encounter.model';

export interface IUpsertEncounterDTO {
  index: number;
  encounter: Encounter;
}
