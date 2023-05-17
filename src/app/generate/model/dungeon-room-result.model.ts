import { constructInstance } from '@shared/utilities/common-util/common.util';

export class DungeonRoomResult {
  hasMonster: boolean = false;
  hasTreasure: boolean = false;

  constructor(result?: any) {
    constructInstance(this, result);
  }
}
