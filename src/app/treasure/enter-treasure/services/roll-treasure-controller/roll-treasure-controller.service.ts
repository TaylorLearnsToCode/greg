import { Injectable } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import {
  MapsAndMagicEntry,
  Specie,
  TreasureListEntry,
  TreasureRollResult,
} from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { MapsAndMagicResult } from '@treasure/enter-treasure/model/treasure-maps-and-magic.model';
import { rollGems } from '@treasure/enter-treasure/utilities/gem-roller.util';
import { rollJewelry } from '@treasure/enter-treasure/utilities/jewelry-roller.util';
import {
  MagicItem,
  MagicItemTable,
  NestedMagicItemTable,
  NestedMagicItemTableEntry,
} from '@treasure/treasure-common/model/magic-item.model';
import {
  MagicItemMap,
  TreasureMap,
} from '@treasure/treasure-common/model/treasure-map.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RollTreasureControllerService {
  private areEnteringTreasure: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private rolledTreasureSource: BehaviorSubject<TreasureRollResult> =
    new BehaviorSubject(null);
  private set rolledTreasure(treasure: TreasureRollResult) {
    this.rolledTreasureSource.next(treasure);
  }

  private readonly d6: DiceRolled = new DiceRolled({
    no: 1,
    pips: 6,
  } as DiceRolled);
  private readonly d100: DiceRolled = new DiceRolled({
    no: 1,
    pips: 100,
  } as DiceRolled);

  areEnteringTreasure$: Observable<boolean> =
    this.areEnteringTreasure.asObservable();
  rolledTreasure$: Observable<TreasureRollResult> =
    this.rolledTreasureSource.asObservable();

  constructor() {}

  toggleAreEnteringTreasure(): void {
    this.areEnteringTreasure.next(!this.areEnteringTreasure.value);
  }

  rollTreasure(treasureList: TreasureListEntry): void {
    const rolledTreasure: TreasureRollResult = new TreasureRollResult();
    rolledTreasure.copper = this.rollSpecie(treasureList.copper);
    rolledTreasure.silver = this.rollSpecie(treasureList.silver);
    rolledTreasure.gold = this.rollSpecie(treasureList.gold);
    rolledTreasure.mapsAndMagic = this.rollMapsAndMagic(
      treasureList.mapsAndMagic
    );
    rolledTreasure.gems = rollGems(treasureList.gems);
    rolledTreasure.jewelry = rollJewelry(treasureList.jewelry);
    this.rolledTreasure = rolledTreasure;
  }

  private findTargetTable(table: NestedMagicItemTableEntry): MagicItemTable {
    let targetTable: MagicItemTable;
    if (doesExist(table.entry)) {
      targetTable = table.entry as MagicItemTable;
    } else {
      targetTable = this.findTargetTable(table);
    }
    return targetTable;
  }

  private rollOnNestedMagicItemTable(
    table: NestedMagicItemTable
  ): Array<MagicItem | TreasureMap | MagicItemMap> {
    let targetTable: MagicItemTable;
    let result: Array<MagicItem | TreasureMap | MagicItemMap> = [];
    for (let tableEntry of table.entries) {
      targetTable = this.findTargetTable(tableEntry);
      const roll = rollDice(this.d100);
      for (let item of targetTable.entries) {
        if (roll >= item.chanceOf.low && roll <= item.chanceOf.high) {
          if (doesExist((item as any).entries)) {
            this.rollOnMagicItemTable(item as any as MagicItemTable);
          } else {
            result.push(item.entry);
          }
          break;
        }
      }
    }
    return result;
  }

  private rollOnMagicItemTable(
    table: MagicItemTable
  ): MagicItem | TreasureMap | MagicItemMap {
    const roll = rollDice(this.d100);
    let targetEntry;
    for (let entry of table.entries) {
      if (roll >= entry.chanceOf.low && roll <= entry.chanceOf.high) {
        targetEntry = entry;
        break;
      }
    }

    if (doesExist((table as any).entries)) {
      return this.rollOnMagicItemTable(targetEntry);
    } else if (doesExist(targetEntry.entry)) {
      return targetEntry.entry;
    }
  }

  private rollMapOrMagicItem(item: MapsAndMagicEntry): MapsAndMagicResult {
    const result: MapsAndMagicResult = new MapsAndMagicResult();

    if (rollDice(this.d100) > item.chanceOf) {
      return result;
    }

    let rolledMapOrMagicItem: Array<MagicItem | TreasureMap | MagicItemMap>;
    for (let i = 0; i < item.numberOf; i++) {
      rolledMapOrMagicItem = this.rollOnNestedMagicItemTable(item.entry);
      rolledMapOrMagicItem.forEach((item) => {
        if (item.description === 'Treasure Map') {
        } else if (item.description === 'Magic Item Map') {
        } else {
          result.items.push(item);
        }
      });
    }
    return result;
  }

  private rollMapsAndMagic(
    mapsAndMagic: MapsAndMagicEntry[]
  ): MapsAndMagicResult[] {
    const result: MapsAndMagicResult[] = [];
    mapsAndMagic.forEach((mapOrMagic) =>
      result.push(this.rollMapOrMagicItem(mapOrMagic))
    );
    return result;
  }

  private rollSpecie(specie: Specie): number {
    return rollDice(this.d100) <= specie.chanceOf ? rollDice(specie.amount) : 0;
  }
}
