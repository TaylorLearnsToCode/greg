import { constructInstance } from '@shared/utilities/common-util/common.util';
import { LAbstractBaseItem } from './legacy-base-item.model';

export class LMagicItem extends LAbstractBaseItem {
  constructor(item?: any) {
    super();
    constructInstance(this, item);
  }
}
