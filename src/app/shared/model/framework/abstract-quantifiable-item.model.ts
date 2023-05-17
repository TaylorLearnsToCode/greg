import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { DiceRolled } from '../utility/dice-rolled.model';

export abstract class AbstractQuantifiableItem {
  name: string = '';
  quantity: DiceRolled = new DiceRolled();
  system: SUPPORTED_SYSTEMS = '' as SUPPORTED_SYSTEMS;

  constructor(item?: any) {
    constructInstance(this, item);
  }
}
