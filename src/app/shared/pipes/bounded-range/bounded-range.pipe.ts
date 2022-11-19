import { Pipe, PipeTransform } from '@angular/core';
import { BoundedRange } from '@shared/model/bounded-range.model';
import { doesExist } from '@shared/utilities/common-util/common.util';

@Pipe({
  name: 'boundedRange',
})
export class BoundedRangePipe implements PipeTransform {
  transform(boundedRange: BoundedRange, ...args: unknown[]): string {
    return doesExist(boundedRange)
      ? `${boundedRange.low}-${boundedRange.high}`
      : '~';
  }
}
