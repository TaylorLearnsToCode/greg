import { DiceRolled } from '../../model/dice-rolled.model';

export function rollDice(
  no: number,
  pips: number,
  modifier?: number,
  multiplier?: number
): number;
export function rollDice(dice: DiceRolled | DiceRolled[]): number;
export function rollDice(...dice: any[]): number {
  let result = 0;
  if (dice[0] instanceof DiceRolled) {
    dice.forEach((die) => {
      if (Array.isArray(die)) {
        die.forEach((subDie) => (result += rollDice(subDie)));
      } else if (die instanceof DiceRolled) {
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

function rollOneDie(die: number | DiceRolled): number {
  const pips = die instanceof DiceRolled ? die.pips : die;
  return Math.floor(Math.random() * pips) + 1;
}
