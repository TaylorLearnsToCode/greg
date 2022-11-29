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
  jewelry: JewelRollResult[] = [];
}

export class GemRollResult {
  n10: number = 0;
  n50: number = 0;
  n100: number = 0;
  n500: number = 0;
  n1000: number = 0;
  n5000: number = 0;
  n10000: number = 0;
  n25000: number = 0;
  n50000: number = 0;
  n100000: number = 0;
  n500000: number = 0;
}

export const RolledGemValue: Map<number, string> = new Map([
  [1, 'n10'],
  [2, 'n50'],
  [3, 'n100'],
  [4, 'n500'],
  [5, 'n1000'],
  [6, 'n5000'],
  [7, 'n10000'],
  [8, 'n25000'],
  [9, 'n50000'],
  [10, 'n100000'],
  [11, 'n500000'],
]);

export const RolledGemChances: Map<number, number> = new Map([
  [1, 10],
  [2, 25],
  [3, 75],
  [4, 90],
  [5, 100],
]);

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

export class JewelRollResult {
  values: number[] = [];
}

export const RolledJewelValues: Map<number, DiceRolled> = new Map([
  [
    20,
    new DiceRolled({
      no: 3,
      multiplier: 100,
    } as DiceRolled),
  ],
  [
    80,
    new DiceRolled({
      multiplier: 1000,
    } as DiceRolled),
  ],
  [
    100,
    new DiceRolled({
      pips: 10,
      multiplier: 1000,
    } as DiceRolled),
  ],
]);
