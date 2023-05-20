import { constructInstance } from '@shared/utilities/common-util/common.util';
import { DungeonRoomResult } from './dungeon-room-result.model';

export class DungeonResult {
  rooms: DungeonRoomResult[] = [];

  constructor(result?: any) {
    constructInstance(this, result);
  }
}
