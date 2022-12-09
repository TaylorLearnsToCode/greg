import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import {
  isWithinRange,
  rollDice,
} from '@shared/utilities/dice-roller/dice-roller.util';
import {
  MagicItem,
  MagicItemTable,
  MagicItemTableEntry,
  NestedMagicItemTable,
  NestedMagicItemTableEntry,
} from '@treasure/treasure-common/model/magic-item.model';
import {
  MagicItemMap,
  TreasureMap,
} from '@treasure/treasure-common/model/treasure-map.model';
import {
  GemOrJewel,
  MapsAndMagicEntry,
} from '../model/treasure-list-entry.model';
import {
  MagicItemMapResult,
  MapsAndMagicResult,
  TreasureMapResult,
} from '../model/treasure-maps-and-magic.model';
import { rollGems } from './gem-roller.util';
import { rollJewelry } from './jewelry-roller.util';

export function rollMapsAndMagic(
  mapsAndMagics: MapsAndMagicEntry[]
): MapsAndMagicResult[] {
  // loop through the maps and magic array
  const result: MapsAndMagicResult[] = [];
  mapsAndMagics.forEach((entry) => result.push(rollMapOrMagicEntry(entry)));
  return result;
}

const d100: DiceRolled = new DiceRolled({ pips: 100 } as DiceRolled);

type MapOrMagicType = MagicItem | TreasureMap | MagicItemMap;

function findTableToRollOn(
  table: MagicItemTable | NestedMagicItemTable
): MagicItemTable {
  const roll: number = rollDice(d100);
  let targetEntry: MagicItemTableEntry | NestedMagicItemTableEntry;
  for (let tableEntry of table.entries) {
    if (isWithinRange(roll, tableEntry.chanceOf)) {
      targetEntry = tableEntry;
      break;
    }
  }

  // if the first result of the target entry's entries has entries, recusion!
  const targetEntryTable: any = targetEntry.entry;
  if (
    doesExist(targetEntryTable.entries) &&
    doesExist(targetEntryTable.entries[0].entries)
  ) {
    return findTableToRollOn(targetEntryTable);
  } else {
    return targetEntryTable;
  }
}

function rollMapOrMagicEntry(
  mapOrMagic: MapsAndMagicEntry
): MapsAndMagicResult {
  // initialize a blank result
  const result: MapsAndMagicResult = new MapsAndMagicResult();

  // Roll for item chance - returning blank if no item is found
  if (rollDice(d100) > mapOrMagic.chanceOf) {
    return result;
  }

  // Roll on the provided table a number of times equal to the "numberOf"
  let mapOrMagicItem: MapOrMagicType;
  for (let i = 0; i < mapOrMagic.numberOf; i++) {
    mapOrMagicItem = rollOnNestedMagicItemTable(mapOrMagic.entry);
    if (
      doesExist((mapOrMagicItem as TreasureMap).silver) ||
      doesExist((mapOrMagicItem as TreasureMap).gold) ||
      doesExist((mapOrMagicItem as TreasureMap).gems) ||
      doesExist((mapOrMagicItem as TreasureMap).jewelry)
    ) {
      result.treasureMaps.push(
        rollTreasureMapResult(mapOrMagicItem as TreasureMap)
      );
    } else if (doesExist((mapOrMagicItem as MagicItemMap).treasure)) {
      result.magicMaps.push(
        rollMagicItemMapResult(mapOrMagicItem as MagicItemMap)
      );
    } else {
      result.items.push(mapOrMagicItem as MagicItem);
    }
  }

  // return the table
  return result;
}

function rollOnNestedMagicItemTable(
  table: MagicItemTable | NestedMagicItemTable
): MapOrMagicType {
  // find table to roll on, under the nesting
  const targetTableEntry: MagicItemTable = findTableToRollOn(
    table
  ) as MagicItemTable;

  // roll a chance of
  const roll: number = rollDice(d100);

  // find the result in the tableEntry
  for (let resultItem of targetTableEntry.entries) {
    if (isWithinRange(roll, resultItem.chanceOf)) {
      if ((resultItem.entry as any).entries) {
        return rollEntries(resultItem.entry as any);
      } else {
        return resultItem.entry;
      }
    }
  }

  // if you've gotten to this point, the roll was out of bounds
  throw new Error(
    `Roll result ${roll} on ${targetTableEntry.name} did not return an entry`
  );
}

function rollEntries(table: MagicItemTable): MapOrMagicType {
  const roll: number = rollDice(d100);
  for (let item of table.entries) {
    if (isWithinRange(roll, item.chanceOf)) {
      return item.entry;
    }
  }
}

function rollTreasureMapResult(map: TreasureMap): TreasureMapResult {
  const result: TreasureMapResult = new TreasureMapResult();
  result.silver = rollDice(map.silver);
  result.gold = rollDice(map.gold);
  result.gems = rollGems([{ numberOf: map.gems } as GemOrJewel])[0];
  result.jewelry = rollJewelry([{ numberOf: map.jewelry } as GemOrJewel])[0];
  return result;
}

function rollMagicItemMapResult(map: MagicItemMap): MagicItemMapResult {
  const result: MagicItemMapResult = new MagicItemMapResult();
  for (let rolledItems of rollMapsAndMagic(map.treasure as any)) {
    for (let magicItem of rolledItems.items) {
      result.items.push(magicItem);
    }
  }
  return result;
}
