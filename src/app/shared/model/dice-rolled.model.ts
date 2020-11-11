import { doesExist } from '../utilities/common-util/common.util';

/** Object representing the roll of a set of like-faced dice */
export class DiceRolled {
  /** A number to be added to or taken away from the roll */
  modifier: number;
  /** A number by which the roll should be multiplied */
  multiplier: number;
  /** The total number of dice of a given size to be rolled */
  no: number;
  /** The number of sides or results of the die: so, 6 for D6; 8 for D8 */
  pips: number;

  constructor(diceRolled?: DiceRolled) {
    diceRolled = doesExist(diceRolled) ? diceRolled : ({} as DiceRolled);
    this.modifier = doesExist(diceRolled.modifier) ? diceRolled.modifier : 0;
    this.multiplier = doesExist(diceRolled.multiplier)
      ? diceRolled.multiplier
      : 1;
    this.no = doesExist(diceRolled.no) ? diceRolled.no : 1;
    this.pips = doesExist(diceRolled.pips) ? diceRolled.pips : 6;
  }

  toString(): string {
    return ''.concat(
      this.no.toString(),
      'D',
      this.pips.toString(),
      this.modifier < 0
        ? this.modifier.toString()
        : this.modifier > 0
        ? `+${this.modifier}`
        : '',
      this.multiplier !== 1 ? `x${this.multiplier}` : ''
    );
  }
}
