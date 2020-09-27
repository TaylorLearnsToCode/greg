import { DiceRolled } from './dice-rolled.model';
import { SaveAs } from './save-as.model';

export class Monster {
  alignment: string;
  armorClass: number;
  attacks: string;
  damage: string;
  frequency: string;
  hitDice: number;
  morale: number;
  movementExploration: number;
  name: string;
  noDungeon: DiceRolled;
  notes: string;
  noWilderness: DiceRolled;
  pctInLair: number;
  saveAs: SaveAs;
  treasureTypeCarried: string;
  treasureTypeLair: string;
}
