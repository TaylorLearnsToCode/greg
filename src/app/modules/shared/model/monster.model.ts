import { DiceRolled } from './dice-rolled.model';
import { SaveAs } from './save-as.model';

/**
 * A non-player entity, intelligent or otherwise, that the party might encounter
 * in the wild or in a dungeon.
 */
export class Monster {
  /** Monster alignment. */
  alignment = '';
  /** Numerical armor class of the monster. Default 9 */
  armorClass = 9;
  /** String description of the monster's attack. @todo: support multiple attacks */
  attacks = '';
  /** Dice pool for the damage dealt by the monster's attack on a hit. Default 0d0. */
  damage: DiceRolled = new DiceRolled(0, 0);
  /** String description of how frequently a given monster appears. */
  frequency = '';
  /** The number of hit dice the the monster possesses. Default 0. @todo: add plusses */
  hitDice = 0;
  /** Monster morale. Default 7. */
  morale = 7;
  /** Numeric movement rate in feet. Default 120 feet. */
  movementExploration = 120;
  /** Read only accessor for monster tactical, or combat, movement in feet. Defaults to 40. */
  get movementTactical(): number {
    return Math.floor(this.movementExploration / 3);
  }
  /** Monster name. */
  name = '';
  /** Dice pool reflecting the number of this monster encountered in a Dungeon. Default 0D0. */
  noDungeon: DiceRolled = new DiceRolled(0, 0);
  /** String of notes regarding this monster. */
  notes = '';
  /** Dice pool reflecting the number of this monster encountered in the Wilderness. Default 0D0. */
  noWilderness: DiceRolled = new DiceRolled(0, 0);
  /**
   * The percentage chance that, when this monster is encountered, it is in its lair.
   * Represented by a whole number between 0 and 100. Default 0.
   */
  pctInLair = 0;
  /** The class and level as which this monster saves. */
  saveAs: SaveAs = new SaveAs();
  /** The string treasure type which is carried by this monster. */
  treasureTypeCarried = '';
  /** The string treasure type which is hoarded by this monster in its lair. */
  treasureTypeLair = '';
}
