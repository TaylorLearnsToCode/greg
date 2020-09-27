import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';

export class Encounter {
  lowRoll: number;
  highRoll: number;
  monsters: Monster[];

  constructor(lowRoll: number, highRoll?: number, monsters?: Monster[]) {
    this.lowRoll = lowRoll;
    this.highRoll = doesExist(highRoll) ? highRoll : lowRoll;
    this.monsters = doesExist(monsters) ? monsters : [];
  }
}
