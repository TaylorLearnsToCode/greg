import { Pipe, PipeTransform } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { getBoundedRange } from '@shared/utilities/dice-roller/dice-roller.util';

/** Pipe for displaying generic dice ranges. */
@Pipe({
  name: 'boundedRange',
})
export class BoundedRangePipe implements PipeTransform {
  /**
   * For a provided dice pool {diceRolled}, returns a human-readable string of the
   * minimum and maximum values, separated by a dash.
   * @param  {DiceRolled|DiceRolled} diceRolled
   */
  transform(diceRolled: DiceRolled | DiceRolled): string {
    const boundedRange: number[] = getBoundedRange(diceRolled);
    return boundedRange.length === 2
      ? `${boundedRange[0]}-${boundedRange[1]}`
      : '';
  }
}
