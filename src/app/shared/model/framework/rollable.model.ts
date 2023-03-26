import { DiceRolled } from '../utility/dice-rolled.model';

/** Abstract parent class to provide base fields for rolling a class with a dice pool. */
export abstract class Rollable {
  /** The chance of "success" - presented as roll under target number; default 100 */
  chanceOf: number = 100;
  /** The dice pool to roll - default 1d% */
  diceRolled: DiceRolled = new DiceRolled({ pips: 100 });
}
