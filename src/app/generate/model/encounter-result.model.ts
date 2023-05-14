import {
  constructInstance,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { TreasureResult } from './treasure-result.model';

/** One monster encounter - as derived from a monster encounter list. */
export class EncounterResult {
  isLair: boolean = false;
  name: string = '';
  quantity: number = 0;
  treasure: TreasureResult[] = [];

  constructor(result?: any) {
    constructInstance(this, result);
    this.handleTreasureResults();
  }

  private handleTreasureResults(): void {
    if (!isEmpty(this.treasure)) {
      this.treasure = this.treasure.map((t) => new TreasureResult(t));
    }
  }
}
