import { areEqual, doesExist } from '@shared/utilities/common-util/common.util';

export class BoundedRange {
  low: number;
  high: number;
  get range(): number[] {
    return [this.low, this.high];
  }

  constructor(boundedRange?: BoundedRange) {
    boundedRange = doesExist(boundedRange)
      ? boundedRange
      : ({} as BoundedRange);
    if (
      doesExist(boundedRange.range) &&
      this.validateRange(boundedRange.range)
    ) {
      this.low = boundedRange.range[0];
      this.high = boundedRange.range[1];
    }
    this.low = this.deriveLowHigh(boundedRange.low, true);
    this.high = this.deriveLowHigh(boundedRange.high, false);
  }

  private deriveLowHigh(value: number, isLow: boolean): number {
    const compareVal = isLow ? this.low : this.high;
    const lowHigh = isLow ? 'LOW' : 'HIGH';
    if (
      doesExist(value) &&
      doesExist(compareVal) &&
      !areEqual(compareVal, value)
    ) {
      console.warn(
        ''.concat(
          `Conflicting RANGE ${compareVal} and `,
          lowHigh,
          ` value ${value} found during intialization.`,
          ` Using provided LOW value ${value}.`
        )
      );
    }
    return doesExist(value)
      ? value
      : isLow
      ? 0
      : doesExist(this.low)
      ? this.low
      : 0;
  }

  private validateRange(newRange: number[]): boolean {
    if (newRange.length !== 2) {
      throw Error(
        'A valid bounded range contains only two entries: LOW and HIGH'
      );
    }
    if (newRange[1] < newRange[0]) {
      throw Error(
        'The LOW value of a bounded range must be lower than the HIGH value'
      );
    }
    return true;
  }
}
