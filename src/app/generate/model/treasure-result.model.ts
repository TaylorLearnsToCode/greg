import { constructInstance } from '@shared/utilities/common-util/common.util';

/**
 * An accounting of one element of a given treasure hoard: e.g. if there are gold
 * coins and a magic sword in a hoard, the hoard would comprise two TreasureResults:
 * one for the gold, one for the sword.
 */
export class TreasureResult {
  /** Human readable identifier for the item contained in this result */
  name: string = '';
  /** The number of this item present in the hoard */
  quantity: number = 0;

  constructor(result?: any) {
    constructInstance(this, result);
  }
}
