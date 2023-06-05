import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { isBetween } from '@shared/utilities/common-util/common.util';
import {
  rollDice,
  rollOnMappedList,
} from '@shared/utilities/dice-util/dice.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';

export abstract class AbstractInspirationService {
  protected readonly d6 = new DiceRolled();

  protected rollOnList(
    list: Map<number, string>,
    die?: DiceRolled,
    predeterminedRoll?: number
  ): string {
    return rollOnMappedList(list, die, predeterminedRoll);
  }

  protected rollOnRange(
    range: Map<BoundedRange, string>,
    die?: DiceRolled,
    predeterminedRoll?: number
  ): string {
    const roll =
      predeterminedRoll === undefined
        ? rollDice(die ? die : this.d6)
        : predeterminedRoll;
    for (const key of range.keys()) {
      if (isBetween(roll, key)) {
        return ((' ' + range.get(key)) as string) + ' ';
      }
    }
    throwError(`Unable to find range entry for result of ${roll}`);
    return '';
  }
}
