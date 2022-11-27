import { Pipe, PipeTransform } from '@angular/core';
import { DiceRangePipe } from '@shared/pipes/dice-range/dice-range.pipe';
import { GemOrJewel } from '@treasure/enter-treasure/model/treasure-list-entry.model';

@Pipe({
  name: 'gemOrJewel',
})
export class GemOrJewelPipe implements PipeTransform {
  constructor(private diceRangePipe: DiceRangePipe) {}

  transform(value: GemOrJewel): string {
    return `${this.diceRangePipe.transform(value.numberOf)}: ${
      value.chanceOf
    }%`;
  }
}
