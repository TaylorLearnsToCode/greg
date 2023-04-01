import { constructInstance } from '@shared/utilities/common-util/common.util';
import { BoundedRange } from '../utility/bounded-range.model';

/** A lookup reference for use with linking table entries to browser storage locations */
export class ReferenceEntry {
  /**
   * The chance of encountering this entry, defined as a low and high value on an
   * assumed dice pool result
   */
  chanceOfRange: BoundedRange = new BoundedRange();
  /**
   * The value in DataManagerService.PERSISTENCE_TYPES under which the referred
   * object is saved in browser storage
   */
  persistenceType: string = '';
  /** The name (key) of the referred item */
  reference: string = '';

  constructor(entry?: any) {
    constructInstance(this, entry);
  }
}
