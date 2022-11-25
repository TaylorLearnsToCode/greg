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

export class MapsAndMagicEntry {
  name: string = '';
  chanceOf: number = 0;
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
  type = '';
  // should be "NUMBER" as a DiceRolled
  gpValue: number = 0;
}
