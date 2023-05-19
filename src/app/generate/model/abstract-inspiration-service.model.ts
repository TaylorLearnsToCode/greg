import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { isBetween } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

export abstract class AbstractInspirationService {
  protected readonly d6 = new DiceRolled();

  protected rollOnList(list: Map<number, string>): string {
    const roll = rollDice(this.d6);
    for (const key of list.keys()) {
      if (key === roll) {
        return ((' ' + list.get(key)) as string) + ' ';
      }
    }
    throw new Error(`Unable to find list entry for result of ${roll}`);
  }

  protected rollOnRange(
    range: Map<BoundedRange, string>,
    predeterminedRoll?: number
  ): string {
    const roll =
      predeterminedRoll === undefined ? rollDice(this.d6) : predeterminedRoll;
    for (const key of range.keys()) {
      if (isBetween(roll, key)) {
        return ((' ' + range.get(key)) as string) + ' ';
      }
    }
    throw new Error(`Unable to find range entry for result of ${roll}`);
  }
}
