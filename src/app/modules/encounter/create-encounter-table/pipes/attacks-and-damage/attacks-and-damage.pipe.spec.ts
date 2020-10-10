import { TestBed } from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { deepFreeze } from '@shared/utilities/common-util/common.util';
import { AttacksAndDamagePipe } from './attacks-and-damage.pipe';

describe('AttacksAndDamagePipe', () => {
  let pipe: AttacksAndDamagePipe;

  const MONSTER = buildMonster();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttacksAndDamagePipe],
    });
    pipe = TestBed.inject(AttacksAndDamagePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Claw for 3-13', () => {
    expect(pipe.transform(MONSTER)).toEqual('Claw! (3-13)');
  });

  /* Utility Functions */
  function buildMonster(): Monster {
    const monster = new Monster();
    monster.attacks = 'Claw!';
    monster.damage = new DiceRolled(2, 6, 1);
    deepFreeze(monster);
    return monster;
  }
});
