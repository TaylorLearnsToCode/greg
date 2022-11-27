import { BoundedRange } from '@shared/model/bounded-range.model';
import { DiceRolled } from '../../model/dice-rolled.model';
import { doesExist } from '../common-util/common.util';

/**
 * For a collection of provided dice pools, provides the minimum and maximum possible
 * results in the form of a two-element array.
 * @param  {DiceRolled[]} ...dice
 */
export function getBoundedRange(...dicePools: DiceRolled[]): BoundedRange {
  let min = 0;
  let max = 0;
  dicePools
    .filter((pool) => doesExist(pool))
    .forEach((pool) => {
      min += (pool.modifier + pool.no) * pool.multiplier;
      max += (pool.modifier + pool.pips * pool.no) * pool.multiplier;
    });
  return new BoundedRange({
    low: min,
    high: max,
  } as BoundedRange);
}

/**
 * For a collection of provided dice pools, provides the full range of possible
 * results of those dice pools in an ascending numeric array.
 * @param  {DiceRolled[]} ...dice
 */
export function getRollRange(...dicePools: DiceRolled[]): number[] {
  const result: number[] = [];
  const [min, max] = getBoundedRange(...dicePools).range;
  for (let i = min; i <= max; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Rolls {no} number of dice, each with {pips} faces, and returns the result.
 * * If a {modifier} is provided, the modifier is added to the result.
 * * If a {multiplier} is provided, the result (including modifier) is
 * multiplied by that multiplier.
 * @param  {number} no
 * @param  {number} pips
 * @param  {number} modifier?
 * @param  {number} multiplier?
 */
export function rollDice(
  no: number,
  pips: number,
  modifier?: number,
  multiplier?: number
): number;
/**
 * Rolls a provided DiceRolled or collection of DiceRolled and returns the result.
 * Multipliers are calculated <i>after</i> modifiers: thus, 1d6+1, multiplied by 3,
 * becomes 3d6+3.
 * @param  {DiceRolled|DiceRolled[]} dice
 */
export function rollDice(dice: DiceRolled | DiceRolled[]): number;
/**
 * Master function for overloaded rollDice methods, supporting the following
 * argument configurations:
 * * no, pips, modifier, multiplier
 * * DiceRolled
 * * DiceRolled[]
 * @param  {any[]} ...dice
 */
export function rollDice(...dice: any[]): number {
  let result = 0;
  if (dice[0] instanceof DiceRolled || Array.isArray(dice)) {
    dice.forEach((die) => {
      if (Array.isArray(die)) {
        die.forEach((subDie) => (result += rollDice(subDie)));
      } else {
        for (let i = 0; i < die.no; i++) {
          result += die.multiplier * (rollOneDie(die) + die.modifier);
        }
      }
    });
  } else {
    const { no, pips, modifier, multiplier } = dice;
    result += rollDice(
      new DiceRolled({ no, pips, modifier, multiplier } as DiceRolled)
    );
  }
  return result;
}

/**
 * For a provided DiceRolled, generates a random number bounded by 1 and the
 * number of pips specified, with even probability between each possible result.
 * @param  {DiceRolled} die
 */
function rollOneDie(die: DiceRolled): number {
  return Math.floor(Math.random() * die.pips) + 1;
}
