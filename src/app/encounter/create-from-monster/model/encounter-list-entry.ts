import { BoundedRange } from '@shared/model/bounded-range.model';
import { WwwMonster } from '@shared/model/www-monster.model';

export class EncounterListEntry {
  range: BoundedRange;
  encounter: WwwMonster;
}
