import {
  constructInstance,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { EncounterResult } from './encounter-result.model';
import { TreasureResult } from './treasure-result.model';

export class DungeonRoomResult {
  get hasMonster(): boolean {
    return !isEmpty(this.monsters);
  }
  get hasTreasure(): boolean {
    return !isEmpty(this.treasure);
  }
  monsters: EncounterResult[] = [];
  treasure: TreasureResult[] = [];

  constructor(result?: any) {
    constructInstance(this, result);
  }
}
