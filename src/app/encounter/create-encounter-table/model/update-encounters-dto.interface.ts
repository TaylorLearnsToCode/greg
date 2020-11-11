import { EncounterTable } from '@encounter/encounter-shared/model/encounter-table.model';
import { Encounter } from '@encounter/encounter-shared/model/encounter.model';
import { IRollMapping } from '@shared/model/roll-index-mapping.interface';

export interface IUpdateEncountersDto {
  encounterRollMapping: IRollMapping[];
  encounters: Array<Encounter | EncounterTable>;
}
