import { constructInstance } from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';

export class MonsterType extends AbstractQuantifiableItem {
  pctInLair: number = 0;
  treasureType: string = '';

  constructor(type?: any) {
    super();
    constructInstance(this, type);
  }
}
