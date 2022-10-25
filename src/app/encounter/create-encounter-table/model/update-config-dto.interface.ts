import { EncounterLocation } from '@encounter/encounter-shared/model/encounter-locationS.enum';
import { EncounterTableType } from '@encounter/encounter-shared/model/encounter-table-types.enum';

export interface IUpdateConfigDto {
  location: EncounterLocation;
  name: string;
  type: EncounterTableType;
}
