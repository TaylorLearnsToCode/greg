import { DiceRolled } from '@shared/model/dice-rolled.model';
import { TreasureListEntry } from './treasure-list-entry.model';

export class TreasureList {
  diceToRoll: DiceRolled = new DiceRolled({
    pips: 100,
  } as DiceRolled);
  entries: TreasureListEntry[] = [];
}
