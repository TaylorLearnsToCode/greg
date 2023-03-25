import { DiceRolled } from '@shared/model/dice-rolled.model';

export const RolledJewelValues: Map<number, DiceRolled> = new Map([
  [
    20,
    new DiceRolled({
      no: 3,
      multiplier: 100,
    } as DiceRolled),
  ],
  [
    80,
    new DiceRolled({
      multiplier: 1000,
    } as DiceRolled),
  ],
  [
    100,
    new DiceRolled({
      pips: 10,
      multiplier: 1000,
    } as DiceRolled),
  ],
]);

export class JewelRollResult {
  values: number[] = [];
}
