import { constructInstance } from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';

export class MonsterRetinue extends AbstractQuantifiableItem {
  /** The incremental percentange chance that the retinue will be found */
  incChance: number = 100;
  /**
   * The number of parent monsters which, cumulatively, determine the chance the retinue will appear:
   * e.g. - "For <i>each</i> five goblins, the chance of a hobgoblin increases by 10%"
   */
  each: number = 0;

  constructor(retinue?: any) {
    super();
    constructInstance(this, retinue);
  }
}
