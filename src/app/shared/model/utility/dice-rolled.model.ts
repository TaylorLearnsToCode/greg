import { constructInstance } from '@shared/utilities/common-util/common.util';

/** A representation of a pool of dice, including modifiers */
export class DiceRolled {
  modifier: number = 0;
  multiplier: number = 1;
  pips: number = 6;
  no: number = 1;

  constructor(dice?: any) {
    constructInstance(this, dice);
  }
}
