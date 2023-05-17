import { constructInstance } from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';

export class MonsterConsort extends AbstractQuantifiableItem {
  /** The percentile chance that the consort will be found */
  pctChance: number = 100;
  /**
   * The number of parent monsters per which one consort will appear:
   * e.g. - "One sargeant <i>every</i> ten soldiers"
   */
  every: number = 0;

  constructor(consort?: any) {
    super();
    constructInstance(this, consort);
  }
}
