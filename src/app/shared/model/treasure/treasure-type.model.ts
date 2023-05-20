import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
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
  system: SUPPORTED_SYSTEMS = '' as SUPPORTED_SYSTEMS;

  constructor(type?: any) {
    if (type?.entries?.length) {
      type.entries = (type.entries as []).map(
        (entry) => new TreasureArticle(entry)
      );
    }
    constructInstance(this, type);
  }
}
