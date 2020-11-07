import { DiceRolled } from '../model/dice-rolled.model';
import { doesExist } from '../utilities/common-util/common.util';

/** An article with which a character or monster may make a physical attack. */
export class Weapon {
  /** The dice pool used to determine a weapon's HP damage inflicted. */
  damage: DiceRolled;
  /** Weapon name. */
  name: string;

  /**
   * Weapon constructor. "Name" property presented first, as it serves as a
   * verbal and mental identifier for the weapon; all other arguments alphebeitzed.
   * @todo - convert to object constructor
   */
  constructor(name?: string, damage?: DiceRolled) {
    this.damage = doesExist(damage) ? damage : new DiceRolled(1, 6);
    this.name = doesExist(name) ? name : '';
  }
}
