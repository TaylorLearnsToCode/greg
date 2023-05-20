import { constructInstance } from '@shared/utilities/common-util/common.util';

export class SelectableSystem {
  futureScope: boolean = false;
  key: string = '';

  constructor(system?: any) {
    constructInstance(this, system);
  }
}
