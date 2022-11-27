import { Pipe, PipeTransform } from '@angular/core';
import { DiceRangePipe } from '@shared/pipes/dice-range/dice-range.pipe';
import { Specie } from '@treasure/enter-treasure/model/treasure-list-entry.model';

@Pipe({
  name: 'speciePipe',
})
export class SpeciePipePipe implements PipeTransform {
  constructor(private diceRangePipe: DiceRangePipe) {}

  transform(value: Specie): string {
    if (value.chanceOf !== 0) {
      return `${this.diceRangePipe.transform(value.amount)} - ${
        value.chanceOf
      }%`;
    } else {
      return 'Nil';
    }
  }
}
