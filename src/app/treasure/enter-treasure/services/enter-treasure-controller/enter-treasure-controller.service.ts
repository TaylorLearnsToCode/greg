import { Injectable } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { ExportService } from '@shared/services/export/export.service';
import {
  areEqual,
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { TreasureListEntry } from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { TreasureList } from '@treasure/enter-treasure/model/treasure-list.model';
import { NestedMagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnterTreasureControllerService {
  private treasureListSource: BehaviorSubject<TreasureList> =
    new BehaviorSubject(new TreasureList());
  private get treasureList(): TreasureList {
    return cloneObject(this.treasureListSource.value);
  }
  private set treasureList(newList: TreasureList) {
    this.treasureListSource.next(newList);
  }

  private editEntrySource: Subject<TreasureListEntry> = new Subject();

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
  editEntry$ = this.editEntrySource.asObservable();

  constructor(private exportService: ExportService) {}

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

  clearList(): void {
    this.treasureListSource.next(new TreasureList());
  }

  compareDiceToRoll(newDice: DiceRolled): boolean {
    return areEqual(newDice, this.diceToRoll);
  }

  containsEntry(newEntries: TreasureListEntry): boolean {
    return !!this.entries.filter((entry) => areEqual(entry, newEntries)).length;
  }

  editEntryAt(index: number): void {
    this.editEntrySource.next(this.treasureList.entries[index]);
  }

  exportList(): void {
    this.exportService.exportAsJson(this.treasureList, 'treasure-list');
  }

  importMapOrMagic(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const item: NestedMagicItemTable = JSON.parse(
        result
      ) as NestedMagicItemTable;
    });
    fileReader.readAsText(file);
  }

  importSavedList(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const newList: TreasureList = JSON.parse(result);
      this.treasureListSource.next(newList);
    });
    fileReader.readAsText(file);
  }

  updateDiceToRoll(newDice: DiceRolled): void {
    if (doesExist(newDice)) {
      this.diceToRoll = newDice;
    }
  }

  removeRecordAt(index: number): void {
    const nextList: TreasureList = this.treasureList;
    nextList.entries.splice(index, 1);
    this.treasureList = nextList;
  }
}
