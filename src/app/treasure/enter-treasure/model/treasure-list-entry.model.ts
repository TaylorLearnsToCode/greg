import { DiceRolled } from '@shared/model/dice-rolled.model';
import { AbstractTreasureTypeEntry } from '@treasure/treasure-common/model/treasure-item.model';

export class TreasureListEntry {
  type: string = '';
  copper: Specie = new Specie();
  silver: Specie = new Specie();
  gold: Specie = new Specie();
  mapsAndMagic: any[] = [];
  gems: GemOrJewel[] = [];
  jewelry: GemOrJewel[] = [];
}

export class Specie extends AbstractTreasureTypeEntry {
  amount: DiceRolled = new DiceRolled();
}

export class GemOrJewel extends AbstractTreasureTypeEntry {
  type = '';
  gpValue: number = 0;
}
