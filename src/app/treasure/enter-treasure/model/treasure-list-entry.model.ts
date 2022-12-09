import { DiceRolled } from '@shared/model/dice-rolled.model';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { NestedMagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { AbstractTreasureTypeEntry } from '@treasure/treasure-common/model/treasure-item.model';
import { GemRollResult } from './treasure-gems.model';
import { JewelRollResult } from './treasure-jewelry.model';
import { MapsAndMagicResult } from './treasure-maps-and-magic.model';

export class TreasureListEntry {
  type: string = '';
  copper: Specie = new Specie();
  silver: Specie = new Specie();
  gold: Specie = new Specie();
  mapsAndMagic: MapsAndMagicEntry[] = [];
  gems: GemOrJewel[] = [];
  jewelry: GemOrJewel[] = [];
}

export class TreasureRollResult {
  copper: number = 0;
  silver: number = 0;
  gold: number = 0;
  mapsAndMagic: MapsAndMagicResult[] = [];
  gems: GemRollResult[] = [];
  jewelry: JewelRollResult[] = [];
}

export class MapsAndMagicEntry {
  name: string = '';
  chanceOf: number = 0;
  numberOf: number = 1;
  entry: NestedMagicItemTable = new NestedMagicItemTable();

  constructor(entry?: any) {
    constructInstance(entry, this);
  }
}

export class Specie extends AbstractTreasureTypeEntry {
  amount: DiceRolled = new DiceRolled();
}

export class GemOrJewel extends AbstractTreasureTypeEntry {
  type: string = '';
  numberOf: DiceRolled = new DiceRolled();
}
