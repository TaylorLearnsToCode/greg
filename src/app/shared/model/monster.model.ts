import { doesExist } from '@shared/utilities/common-util/common.util';
import { DiceRolled } from './dice-rolled.model';
import { SaveAs } from './save-as.model';
import { Weapon } from './weapon.model';

/**
 * A non-player entity, intelligent or otherwise, that the party might encounter
 * in the wild or in a dungeon.
 */
export class Monster {
  /** Monster alignment. */
  alignment: string;
  /** Numerical armor class of the monster. Default 9 */
  armorClass: number;
  /** The attack or attacks which the monster is able to make. */
  attacks: Weapon[];
  /** String description of how frequently a given monster appears. */
  frequency: string;
  /** The number of hit dice the the monster possesses. Default 0. */
  hitDice: number;
  /** A number, plus or minus, applied to a monster's hit die roll: e.g - a Troll is 6<b>+3</b> hit dice. */
  hitPointModifier: number;
  /** Monster morale. Default 7. */
  morale: number;
  /** Numeric movement rate in feet. Default 120 feet. */
  movementExploration: number;
  /** Read only accessor for monster tactical, or combat, movement in feet. Defaults to 40. */
  get movementTactical(): number {
    return Math.floor(this.movementExploration / 3);
  }
  /** Monster name. */
  name: string;
  /** Dice pool reflecting the number of this monster encountered in a Dungeon. Default 1d6. */
  noDungeon: DiceRolled;
  /** String of notes regarding this monster. */
  notes: string;
  /** Dice pool reflecting the number of this monster encountered in the Wilderness. Default 1d6. */
  noWilderness: DiceRolled;
  /**
   * The percentage chance that, when this monster is encountered, it is in its lair.
   * Represented by a whole number between 0 and 100. Default 0.
   */
  pctInLair: number;
  /** The class and level as which this monster saves. */
  saveAs: SaveAs;
  /** The string treasure type which is carried by this monster. */
  treasureTypeCarried: string;
  /** The string treasure type which is hoarded by this monster in its lair. */
  treasureTypeLair: string;

  constructor(monster?: Monster) {
    monster = doesExist(monster) ? monster : ({} as Monster);
    this.alignment = doesExist(monster.alignment) ? monster.alignment : '';
    this.armorClass = doesExist(monster.armorClass) ? monster.armorClass : 9;
    this.attacks = doesExist(monster.attacks)
      ? monster.attacks.map((attack) => new Weapon(attack.name, attack.damage))
      : [new Weapon()];
    this.frequency = doesExist(monster.frequency) ? monster.frequency : '';
    this.hitDice = doesExist(monster.hitDice) ? monster.hitDice : 0;
    this.hitPointModifier = doesExist(monster.hitPointModifier)
      ? monster.hitPointModifier
      : 0;
    this.morale = doesExist(monster.morale) ? monster.morale : 7;
    this.movementExploration = doesExist(monster.movementExploration)
      ? monster.movementExploration
      : 120;
    this.name = doesExist(monster.name) ? monster.name : '';
    this.noDungeon = doesExist(monster.noDungeon)
      ? new DiceRolled(monster.noDungeon.no, monster.noDungeon.pips)
      : new DiceRolled();
    this.notes = doesExist(monster.notes) ? monster.notes : '';
    this.noWilderness = doesExist(monster.noWilderness)
      ? new DiceRolled(monster.noWilderness.no, monster.noWilderness.pips)
      : new DiceRolled();
    this.pctInLair = doesExist(monster.pctInLair) ? monster.pctInLair : 0;
    this.saveAs = doesExist(monster.saveAs)
      ? new SaveAs(monster.saveAs.asClass, monster.saveAs.level)
      : new SaveAs();
    this.treasureTypeCarried = doesExist(monster.treasureTypeCarried)
      ? monster.treasureTypeCarried
      : '';
    this.treasureTypeLair = doesExist(monster.treasureTypeLair)
      ? monster.treasureTypeLair
      : '';
  }
}
