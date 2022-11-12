import { DiceRolled } from '@shared/model/dice-rolled.model';
import { WwwMonster } from '@shared/model/www-monster.model';

export class EncounterListEntry {
  range: DiceRolled;
  encounter: WwwMonster;
}
