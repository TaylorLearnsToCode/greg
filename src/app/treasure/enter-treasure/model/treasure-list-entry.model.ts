import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { NestedMagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { AbstractTreasureTypeEntry } from '@treasure/treasure-common/model/treasure-item.model';

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
  gems: GemRollResult[] = [];
}

export class GemRollResult {
  no10: number = 0;
  no50: number = 0;
  no100: number = 0;
  no500: number = 0;
  no1k: number = 0;
  no5k: number = 0;
  no10k: number = 0;
  no25k: number = 0;
  no50k: number = 0;
  no100k: number = 0;
  no500k: number = 0;
}

export class MapsAndMagicEntry {
  name: string = '';
  chanceOf: number = 0;
  numberOf: number = 1;
  entry: NestedMagicItemTable = new NestedMagicItemTable();

  constructor(entry?: MapsAndMagicEntry) {
    if (doesExist(entry)) {
      Object.keys(this).forEach((key) => {
        if (doesExist(entry[key])) {
          this[key] = entry[key];
        }
      });
    }
  }
}

export class Specie extends AbstractTreasureTypeEntry {
  amount: DiceRolled = new DiceRolled();
}

export class GemOrJewel extends AbstractTreasureTypeEntry {
  type: string = '';
  numberOf: DiceRolled = new DiceRolled();
}
