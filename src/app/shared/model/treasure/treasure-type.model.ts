import { constructInstance } from '@shared/utilities/common-util/common.util';
import { TreasureArticle } from './treasure-article.model';

/**
 * Singular treasure entry - a type which can be assigned to monster or
 * encounter to roll treasure against.
 */
export class TreasureType {
  /** Human readable identifier for the type */
  type: string = '';
  /**
   * Columns of the treasure table - a collection of rollable treasure
   * lists to be checked in sequence.
   */
  entries: TreasureArticle[] = [];
  /** The game system to which this treasure type maps */
  system: string = '';

  constructor(type?: any) {
    constructInstance(this, type);
  }
}
