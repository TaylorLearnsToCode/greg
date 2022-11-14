import { DiceRolled } from '@shared/model/dice-rolled.model';

export class TreasureListEntry {
  type: string = '';
  copper: Specie = new Specie();
  silver: Specie = new Specie();
  gold: Specie = new Specie();
  mapsAndMagic: MagicItem[] = [];
  gems: GemOrJewel[] = [];
  jewelry: GemOrJewel[] = [];
}

class AbstractTreasureItem {
  chanceOf: number = 0;
}

export class Specie extends AbstractTreasureItem {
  amount: DiceRolled = new DiceRolled();
}

export class MagicItem extends AbstractTreasureItem {
  type: string = '';
  description: string = '';
}

export class GemOrJewel extends AbstractTreasureItem {
  type = '';
  gpValue: number = 0;
}
