import { BoundedRange } from '@shared/model/bounded-range.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { getBoundedRange, getRollRange, rollDice } from './dice-roller.util';

describe('DiceRoller', () => {
  let d6: DiceRolled;
  let d8: DiceRolled;
  let variableRange: BoundedRange;

  beforeEach(() => {
    d6 = new DiceRolled();
    d8 = new DiceRolled({ pips: 8 } as DiceRolled);
    variableRange = null;
  });

  describe('getBoundedRange', () => {
    it('should return 1-6', () => {
      variableRange = getBoundedRange(d6);
      runBoundedRangeExpectation(1, 6);
    });

    it('should return 2-7', () => {
      d6.modifier = 1;
      variableRange = getBoundedRange(d6);
      runBoundedRangeExpectation(2, 7);
    });

    it('should return 10-60', () => {
      d6.multiplier = 10;
      variableRange = getBoundedRange(d6);
      runBoundedRangeExpectation(10, 60);
    });

    it('should return 20-70', () => {
      d6.modifier = 1;
      d6.multiplier = 10;
      variableRange = getBoundedRange(d6);
      runBoundedRangeExpectation(20, 70);
    });

    it('should return 2-14', () => {
      variableRange = getBoundedRange(d6, d8);
      runBoundedRangeExpectation(2, 14);
    });
  });

  describe('getRollRange', () => {
    let variableRange: number[];

    beforeEach(() => (variableRange = null));

    it('should return 1-6', () => {
      variableRange = getRollRange(d6);
      expect(variableRange.length).toBe(6);
      expect(variableRange[0]).toBe(1);
      expect(variableRange[5]).toBe(6);
    });

    it('should return 2-12', () => {
      d6.no = 2;
      variableRange = getRollRange(d6);
      expect(variableRange.length).toBe(11);
      expect(variableRange[0]).toBe(2);
      expect(variableRange[10]).toBe(12);
    });

    it('should return 2-14', () => {
      variableRange = getRollRange(d6, d8);
      expect(variableRange.length).toBe(13);
      expect(variableRange[0]).toBe(2);
      expect(variableRange[12]).toBe(14);
    });
  });

  describe('rollDice', () => {
    let result: number;

    it('should accept four params', () => {
      for (let i = 0; i < 3; i++) {
        result = null;
        result = rollDice(d6.no, d6.pips, d6.modifier, d6.multiplier);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
      }
    });

    it('should accept a dieRolled', () => {
      for (let i = 0; i < 3; i++) {
        result = null;
        result = rollDice(d8);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(8);
      }
    });

    it('should accept a list of diceRolled', () => {
      for (let i = 0; i < 3; i++) {
        result = null;
        result = rollDice([d6, d8]);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(14);
      }
    });
  });

  /* Utility Functions */
  function runBoundedRangeExpectation(low: number, high: number): void {
    expect(variableRange.range.length).toBe(2);
    expect(variableRange.range[0]).toBe(low);
    expect(variableRange.low).toBe(low);
    expect(variableRange.range[1]).toBe(high);
    expect(variableRange.high).toBe(high);
  }
});
