import { BoundedRange } from '@shared/model/utility/bounded-range.model';

export abstract class LAbstractTableEntry {
  chanceOf: BoundedRange = new BoundedRange();
  abstract item: any;
}
