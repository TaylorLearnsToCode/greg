import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { TreasureResult } from './treasure-result.model';

/** Interface contract for services which provide treasure result generation */
export interface TreasureGeneratorService {
  generateTreasureByType(treasureType: TreasureType): TreasureResult[];
}
