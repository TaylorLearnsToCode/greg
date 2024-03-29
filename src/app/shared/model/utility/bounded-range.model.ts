import { constructInstance } from '@shared/utilities/common-util/common.util';

export class BoundedRange {
  low = 0;
  high = 0;

  constructor(range?: any) {
    constructInstance(this, range);
  }
}
