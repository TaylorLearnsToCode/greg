import { Injectable } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import {
  areEqual,
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { TreasureListEntry } from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { TreasureList } from '@treasure/enter-treasure/model/treasure-list.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnterTreasureControllerService {
  private treasureListSource: BehaviorSubject<TreasureList> =
    new BehaviorSubject(new TreasureList());
  private get treasureList(): TreasureList {
    return cloneObject(this.treasureListSource.value);
  }

  private get diceToRoll(): DiceRolled {
    return this.treasureList.diceToRoll;
  }
  private set diceToRoll(newDice: DiceRolled) {
    const nextList = this.treasureList;
    nextList.diceToRoll = newDice;
    this.treasureListSource.next(nextList);
  }
  private get entries(): TreasureListEntry[] {
    return this.treasureList.entries;
  }
  private set entries(newList: TreasureListEntry[]) {
    const nextList = this.treasureList;
    nextList.entries = newList;
    this.treasureListSource.next(nextList);
  }

  treasureList$ = this.treasureListSource.asObservable();

  constructor() {}

  addEntry(newEntry: TreasureListEntry): void {
    if (doesExist(newEntry)) {
      const nextEntries = this.entries;
      const indexOf: number = nextEntries.findIndex((entry) =>
        areEqual(entry.type, newEntry.type)
      );
      if (indexOf === -1) {
        nextEntries.push(newEntry);
      } else {
        nextEntries.splice(indexOf, 1, newEntry);
      }

      this.entries = nextEntries;
    }
  }

  compareDiceToRoll(newDice: DiceRolled): boolean {
    return areEqual(newDice, this.diceToRoll);
  }

  containsEntry(newEntries: TreasureListEntry): boolean {
    return !!this.entries.filter((entry) => areEqual(entry, newEntries)).length;
  }

  updateDiceToRoll(newDice: DiceRolled): void {
    if (doesExist(newDice)) {
      this.diceToRoll = newDice;
    }
  }
}
