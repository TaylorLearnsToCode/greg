import { constructInstance } from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';
import { MonsterConsort } from './monster-consort.model';

export class MonsterType extends AbstractQuantifiableItem {
  pctInLair: number = 0;
  treasureType: string = '';
  /**
   * Leaders, bruisers, special units which will occur proportionally to the size of the
   * monster encounter. E.G. - "One sargeant per ten soldiers"
   */
  consorts: MonsterConsort[] = [];
  /**
   * Static monsters accompanying an encounter. E.G. - "A priest will always be accompanied
   * by 2-12 acolytes"
   */
  retinue: MonsterType[] = [];

  constructor(type?: any) {
    super();
    constructInstance(this, type);
  }
}
