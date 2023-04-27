import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { LAbstractTableEntry } from './legacy-abstract-table-entry.model';

export abstract class LAbstractTable {
  diceToRoll: DiceRolled = new DiceRolled({
    pips: 100,
  });
  name = '';
  abstract entries: LAbstractTableEntry[];
}
