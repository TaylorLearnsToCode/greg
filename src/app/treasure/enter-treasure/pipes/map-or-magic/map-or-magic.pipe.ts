import { Pipe, PipeTransform } from '@angular/core';
import { MapsAndMagicEntry } from '@treasure/enter-treasure/model/treasure-list-entry.model';

@Pipe({
  name: 'mapOrMagic',
})
export class MapOrMagicPipe implements PipeTransform {
  transform(value: MapsAndMagicEntry): string {
    return `${value.chanceOf}%: ${value.numberOf} ${value.name}`;
  }
}
