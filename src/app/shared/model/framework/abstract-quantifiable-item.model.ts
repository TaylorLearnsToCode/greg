import { constructInstance } from '@shared/utilities/common-util/common.util';
import { DiceRolled } from '../utility/dice-rolled.model';

export abstract class AbstractQuantifiableItem {
  name: string = '';
  quantity: DiceRolled = new DiceRolled();

  constructor(item?: any) {
    constructInstance(this, item);
  }
}
