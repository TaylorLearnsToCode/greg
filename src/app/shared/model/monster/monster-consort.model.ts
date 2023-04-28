import { constructInstance } from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';

export class MonsterConsort extends AbstractQuantifiableItem {
  /**
   * The number of parent monsters per which one consort will appear:
   * "one sargeant <i>every</i> ten soldiers"
   */
  every: number = 0;

  constructor(consort?: any) {
    super();
    constructInstance(this, consort);
  }
}
