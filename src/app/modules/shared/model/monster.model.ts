import { DiceRolled } from './dice-rolled.model';
import { SaveAs } from './save-as.model';

/**
 * A non-player entity, intelligent or otherwise, that the party might encounter
 * in the wild or in a dungeon.
 */
export class Monster {
  alignment = '';
  armorClass = 9;
  attacks = '';
  damage: DiceRolled = new DiceRolled(0, 0);
  frequency = '';
  hitDice = 0;
  morale = 7;
  movementExploration = 120;
  get movementTactical(): number {
    return Math.floor(this.movementExploration / 3);
  }
  name = '';
  noDungeon: DiceRolled = new DiceRolled(0, 0);
  notes = '';
  noWilderness: DiceRolled = new DiceRolled(0, 0);
  pctInLair = 0;
  saveAs: SaveAs = new SaveAs('Fighter', 0);
  treasureTypeCarried = '';
  treasureTypeLair = '';
}
