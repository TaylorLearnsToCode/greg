import { Pipe, PipeTransform } from '@angular/core';
import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';

@Pipe({
  name: 'magicItemDisplay',
})
export class MagicItemDisplayPipe implements PipeTransform {
  transform(magicItem: MagicItem): string {
    return `${magicItem.name} (${magicItem.description})`;
  }
}
