import { TestBed } from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { NoAppearingRangePipe } from './no-appearing-range.pipe';

describe('NoAppearingRangePipe', () => {
  let pipe: NoAppearingRangePipe;

  const MONSTER = buildTestMonster();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAppearingRangePipe],
    });
    pipe = TestBed.inject(NoAppearingRangePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the number appearing in a dungeon', () => {
    expect(pipe.transform(MONSTER, true)).toEqual('1-6');
  });

  it('should return the number appearing in a wilderness', () => {
    expect(pipe.transform(MONSTER, false)).toEqual('2-12');
  });

  it('should default to returning the number appearing in a wilderness', () => {
    expect(pipe.transform(MONSTER)).toEqual('2-12');
  });

  /* Utility Functions */
  function buildTestMonster(): Monster {
    const monster = new Monster();
    monster.noDungeon = new DiceRolled(1, 6);
    monster.noWilderness = new DiceRolled(2, 6);
    return monster;
  }
});
