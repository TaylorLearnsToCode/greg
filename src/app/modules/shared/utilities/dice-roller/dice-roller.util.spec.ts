import { DiceRolled } from '@shared/model/dice-rolled.model';
import { getRollRange, rollDice } from './dice-roller.util';

describe('DiceRoller', () => {
  let d6: DiceRolled;
  let d8: DiceRolled;

  beforeEach(() => {
    d6 = new DiceRolled(1, 6);
    d8 = new DiceRolled(1, 8);
  });

  describe('getRollRange', () => {
    let variableRange: number[];

    beforeEach(() => {
      variableRange = null;
    });

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
      variableRange = getRollRange([d6, d8]);
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
});
