import { doesExist } from '@shared/utilities/common-util/common.util';

export class EncounterResultMapping {
  encounterIndex: number;
  high: number;
  low: number;

  constructor(mapping?: EncounterResultMapping) {
    mapping = doesExist(mapping) ? mapping : ({} as EncounterResultMapping);
    this.encounterIndex = doesExist(mapping.encounterIndex)
      ? mapping.encounterIndex
      : 1;
    this.low = doesExist(mapping.low) ? mapping.low : 1;
    this.high = doesExist(mapping.high) ? mapping.high : this.low;
  }
}
