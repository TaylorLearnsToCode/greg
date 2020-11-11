import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';

export class Encounter {
  name: string;
  monsters: Monster[];

  constructor(encounter?: Encounter) {
    encounter = doesExist(encounter) ? encounter : ({} as Encounter);
    this.name = doesExist(encounter.name) ? encounter.name : 'Encounter';
    this.monsters = doesExist(encounter.monsters)
      ? encounter.monsters.map((monster) => new Monster(monster))
      : [];
  }
}
