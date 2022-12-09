import { doesExist } from '@shared/utilities/common-util/common.util';

/** Object representing the roll of a set of like-faced dice */
export class DiceRolled {
  /** A number to be added to or taken away from the roll */
  modifier: number = 0;
  /** A number by which the roll should be multiplied */
  multiplier: number = 1;
  /** The total number of dice of a given size to be rolled */
  no: number = 1;
  /** The number of sides or results of the die: so, 6 for D6; 8 for D8 */
  pips: number = 6;

  constructor(diceRolled?: any) {
    if (doesExist(diceRolled)) {
      Object.keys(this).forEach((key) => {
        if (doesExist(diceRolled[key])) {
          this[key] = diceRolled[key];
        }
      });
    }
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
