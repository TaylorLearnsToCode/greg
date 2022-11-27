import { Pipe, PipeTransform } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';

@Pipe({
  name: 'diceRolled',
})
export class DiceRolledPipe implements PipeTransform {
  transform(value: DiceRolled): string {
    return this.amendForMultiplier(
      `${value.no}d${value.pips}${this.deriveModifierString(value.modifier)}`,
      value.multiplier
    );
  }

  private amendForMultiplier(valueString: string, multiplier: number): string {
    if (!doesExist(multiplier) || multiplier === 1) {
      return valueString;
    } else {
      return `( ${valueString} ) x ${multiplier}`;
    }
  }

  private deriveModifierString(modifier: number): string {
    if (!doesExist(modifier) || modifier === 0) {
      return '';
    } else if (modifier > 0) {
      return ` + ${modifier}`;
    } else {
      return ` - ${Math.abs(modifier)}`;
    }
  }
}
