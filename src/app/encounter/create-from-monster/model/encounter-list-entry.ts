import { BoundedRange } from '@shared/model/bounded-range.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { WwwMonster } from '@shared/model/www-monster.model';

export class EncounterListEntry {
  range: BoundedRange;
  encounter: WwwMonster;
}

export class EncounterList {
  diceToRoll: DiceRolled;
  encounters: EncounterListEntry[];
}
