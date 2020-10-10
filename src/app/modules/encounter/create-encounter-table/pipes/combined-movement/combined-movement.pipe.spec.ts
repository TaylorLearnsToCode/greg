import { TestBed } from '@angular/core/testing';
import { Monster } from '@shared/model/monster.model';
import { CombinedMovementPipe } from './combined-movement.pipe';

describe('CombinedMovementPipe', () => {
  let pipe: CombinedMovementPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombinedMovementPipe],
    });
    pipe = TestBed.inject(CombinedMovementPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should return 120' (40')`, () => {
    const monster = new Monster();
    monster.movementExploration = 120;
    expect(pipe.transform(monster)).toEqual(`120' (40')`);
  });
});
