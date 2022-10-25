import { DiceRolled } from './dice-rolled.model';

export class WwwMonster {
  movement: number = 0;
  charge: number = 0;
  noAppearing: DiceRolled = new DiceRolled();
  chanceInLair: number = 0;
  treasureType: string = '';
  morale: number = 0;
  meleeAttacks: WeaponEquivalence[] = [];
  missileAttacks: WeaponEquivalence[] = [];
  defendsAs: ManEquivalence = new ManEquivalence();
  specialQualities: string = '';
}

export class ManEquivalence {
  no: number = 1;
  troopType: string = '';
  cavalry?: boolean = false;
}

export class WeaponEquivalence extends ManEquivalence {
  type: string = '';
  length: number = 0;
  modifier?: number = 0;
}
