import { EncounterTableType } from '@encounter/encounter-shared/model/encounter-table-types.enum';

export interface IUpdateConfigDto {
  name: string;
  type: EncounterTableType;
}
