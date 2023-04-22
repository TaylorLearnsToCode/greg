import { Pipe, PipeTransform } from '@angular/core';
import { fromCamelCase } from '@shared/utilities/common-util/common.util';

@Pipe({
  name: 'fromCamelCase',
})
export class FromCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    return fromCamelCase(value);
  }
}
