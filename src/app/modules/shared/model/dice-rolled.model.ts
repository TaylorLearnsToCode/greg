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

  /**
   * DiceRolled Constructor. Arguments arranged such that it can be read:
   *
   * <i>{no} die {pips} plus/minus {modifier} times {multiplier}</i>
   * @param  {number} no
   * @param  {number} pips
   * @param  {number} modifier?
   * @param  {number} multiplier?
   */
  constructor(
    no: number,
    pips: number,
    modifier?: number,
    multiplier?: number
  ) {
    this.modifier = doesExist(modifier) ? modifier : 0;
    this.multiplier = doesExist(multiplier) ? multiplier : 1;
    this.no = doesExist(no) ? no : 1;
    this.pips = doesExist(pips) ? pips : 6;
  }
}
