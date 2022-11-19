import { TestBed } from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { DiceRangePipe } from '@shared/pipes/dice-range/dice-range.pipe';

describe('BoundedRangePipe', () => {
  let pipe: DiceRangePipe;

  const d6 = new DiceRolled();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceRangePipe],
    });
    pipe = TestBed.inject(DiceRangePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 1-6', () => {
    expect(pipe.transform(d6)).toEqual('1-6');
  });

  it('should return 2-12', () => {
    expect(pipe.transform([d6, d6])).toEqual('2-12');
  });
});
