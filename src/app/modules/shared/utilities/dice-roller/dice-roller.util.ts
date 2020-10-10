import { DiceRolled } from '../../model/dice-rolled.model';
import { doesExist } from '../common-util/common.util';

/**
 * For a provided dice pool, provides the minimum and maximum possible results in
 * the form of a two-element array.
 * @param  {DiceRolled|DiceRolled[]} dice
 */
export function getBoundedRange(dice: DiceRolled | DiceRolled[]): number[] {
  const boundedRange: number[] = [];
  if (Array.isArray(dice)) {
    let nextRange: number[];
    dice.forEach((die) => {
      nextRange = getBoundedRange(die);
      if (!doesExist(boundedRange[0]) || boundedRange[0] > nextRange[0]) {
        boundedRange[0] = nextRange[0];
      }
      if (!doesExist(boundedRange[1]) || boundedRange[1] < nextRange[1]) {
        boundedRange[1] = nextRange[1];
      }
    });
  } else {
    boundedRange.push((1 + dice.modifier) * dice.multiplier * dice.no);
    boundedRange.push((dice.pips + dice.modifier) * dice.multiplier * dice.no);
  }
  return boundedRange;
}

/**
 * Returns an array containing all possible result values for a given DiceRolled,
 * arranged lowest to highest.
 * @param  {DiceRolled} dice
 */
export function getRollRange(dice: DiceRolled | DiceRolled[]): number[] {
  const result: number[] = [];
  let min: number;
  let max: number;

  if (Array.isArray(dice)) {
    min = 0;
    max = 0;
    dice.forEach((die) => {
      min += (1 + die.modifier) * die.multiplier * die.no;
      max += (die.pips + die.modifier) * die.multiplier * die.no;
    });
  } else {
    min = (1 + dice.modifier) * dice.multiplier * dice.no;
    max = (dice.pips + dice.modifier) * dice.multiplier * dice.no;
  }
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
  if (dice[0] instanceof DiceRolled || Array.isArray(dice[0])) {
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
    const [no, pips, modifier, multiplier] = dice;
    result += rollDice(new DiceRolled(no, pips, modifier, multiplier));
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
