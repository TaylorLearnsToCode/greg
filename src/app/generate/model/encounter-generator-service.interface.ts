import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { EncounterResult } from './encounter-result.model';

/** Interface contract for services which provide encounter result generation */
export interface EncounterGeneratorService {
  generateEncounterFromList(list: ReferenceEntryTable): EncounterResult[];
}
