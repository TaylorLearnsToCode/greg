import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { EncounterType } from './encounter-types.enum';

export class Encounter {
  monsters: Monster[];
  name: string;
  type: EncounterType;

  constructor(encounter?: Encounter) {
    encounter = doesExist(encounter) ? encounter : ({} as Encounter);
    this.monsters = doesExist(encounter.monsters)
      ? encounter.monsters.map((monster) => new Monster(monster))
      : [];
    this.name = doesExist(encounter.name) ? encounter.name : 'Encounter';
    this.type = doesExist(encounter.type)
      ? encounter.type
      : EncounterType.DUNGEON;
  }
}
