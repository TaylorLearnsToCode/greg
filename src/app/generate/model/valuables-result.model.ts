import { SPECIE_TYPES } from '@assets/app-configs/specie-types.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { TreasureResult } from '@generate/model/treasure-result.model';

/**
 * Representation of something of value in a treasure.
 * Gems, jewelry, pieces of art, etc.
 */
export class ValueablesResult extends TreasureResult {
  /** The coin denomination in which the value of this item is measured. Default Gold Pieces */
  denomination: SPECIE_TYPES = SPECIE_TYPES.GOLD;
  /** The valuation of each individual piece of this valuable */
  value: number = 0;

  constructor(result?: any) {
    super();
    constructInstance(this, result);
  }
}
