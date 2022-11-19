import { Pipe, PipeTransform } from '@angular/core';
import { BoundedRange } from '@shared/model/bounded-range.model';
import { getBoundedRange } from '@shared/utilities/dice-roller/dice-roller.util';

/** Pipe for displaying generic dice ranges. */
@Pipe({
  name: 'diceRange',
})
export class DiceRangePipe implements PipeTransform {
  /**
   * For a provided dice pool {diceRolled}, returns a human-readable string of the
   * minimum and maximum values, separated by a dash. Supports the following
   * argument type configurations:
   * * DiceRolled
   * * DiceRolled[]
   * @param  {any} diceRolled - typed as {any} to support overloading when extending
   * @param  {any[]} ...args - optional arguments usable by implementing functions
   */
  transform(diceRolled: any, ...args: any[]): any {
    const boundedRange: BoundedRange = Array.isArray(diceRolled)
      ? getBoundedRange(...diceRolled)
      : getBoundedRange(diceRolled);
    return `${boundedRange.low}-${boundedRange.high}`;
  }
}
