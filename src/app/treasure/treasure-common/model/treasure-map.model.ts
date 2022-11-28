import { DiceRolled } from '@shared/model/dice-rolled.model';
import { NestedMagicItemTableEntry } from './magic-item.model';

export class TreasureMap {
  name: string = '';
  readonly description: string = 'Treasure Map';
  silver: DiceRolled = new DiceRolled();
  gold: DiceRolled = new DiceRolled();
  gems: DiceRolled = new DiceRolled();
  jewelry: DiceRolled = new DiceRolled();
}

export class MagicItemMap {
  name: string = '';
  readonly description: string = 'Magic Item Map';
  treasure: MagicItemMapEntry[] = [];
}

export class MagicItemMapEntry {
  numberOf: number = 0;
  item: NestedMagicItemTableEntry = new NestedMagicItemTableEntry();
}