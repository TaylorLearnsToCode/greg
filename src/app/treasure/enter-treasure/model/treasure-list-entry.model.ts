import { DiceRolled } from '@shared/model/dice-rolled.model';
import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';
import { AbstractTreasureItem } from '@treasure/treasure-common/model/treasure-item.model';

export class TreasureListEntry {
  type: string = '';
  copper: Specie = new Specie();
  silver: Specie = new Specie();
  gold: Specie = new Specie();
  mapsAndMagic: MagicItem[] = [];
  gems: GemOrJewel[] = [];
  jewelry: GemOrJewel[] = [];
}

export class Specie extends AbstractTreasureItem {
  amount: DiceRolled = new DiceRolled();
}

export class GemOrJewel extends AbstractTreasureItem {
  type = '';
  gpValue: number = 0;
}
