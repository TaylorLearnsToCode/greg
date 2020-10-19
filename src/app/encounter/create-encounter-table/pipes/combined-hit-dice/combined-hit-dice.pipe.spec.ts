import { TestBed } from '@angular/core/testing';
import { Monster } from '@shared/model/monster.model';
import { CombinedHitDicePipe } from './combined-hit-dice.pipe';

describe('CombinedHitDicePipe', () => {
  let pipe: CombinedHitDicePipe;
  let monster: Monster;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombinedHitDicePipe],
    });
    pipe = TestBed.inject(CombinedHitDicePipe);
    monster = new Monster();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return hit dice only', () =>
    expect(pipe.transform(monster)).toEqual('0'));

  it('should return hit dice plus one', () => {
    monster.hitPointModifier = 1;
    expect(pipe.transform(monster)).toEqual('0+1');
  });

  it('should return hit dice minus one', () => {
    monster.hitPointModifier = -1;
    expect(pipe.transform(monster)).toEqual('0-1');
  });
});
