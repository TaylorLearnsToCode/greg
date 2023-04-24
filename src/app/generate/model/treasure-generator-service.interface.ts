import { TreasureResult } from '@generate/model/treasure-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { TreasureMapResult } from './treasure-map-result.model';

/** Interface contract for services which provide treasure result generation */
export interface TreasureGeneratorService {
  generateTreasureByTreasureType(treasureType: TreasureType): TreasureResult[];
  generateTreasureMap(
    treasureMap: ReferenceEntryTable
  ): TreasureMapResult | null;
}
