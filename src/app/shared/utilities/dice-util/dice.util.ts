import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { throwError } from '../framework-util/framework.util';

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
 * For a provided Map, rolls the provided die and returns the value of the map entry
 * identified by the roll result as a key.
 *
 * @param  {Map<number, string>} mappedList
 * @param  {DiceRolled} diceToRoll Optional: default d6
 */
export function rollOnMappedList(
  mappedList: Map<number, string>,
  diceToRoll?: DiceRolled,
  predeterminedRoll?: number
): string {
  const dice = diceToRoll === undefined ? new DiceRolled() : diceToRoll;
  const roll = predeterminedRoll ? predeterminedRoll : rollDice(dice);
  for (const key of mappedList.keys()) {
    if (key === roll) {
      return ((' ' + mappedList.get(key)) as string) + ' ';
    }
  }
  throwError(`Unable to find list entry for result of ${roll}`);
  return '';
}

/**
 * For a provided DiceRolled, generates a random number bounded by 1 and the
 * number of pips specified, with even probability between each possible result.
 * @param  {DiceRolled} die
 */
function rollOneDie(die: DiceRolled): number {
  return Math.floor(Math.random() * die.pips) + 1;
}
