import { Injectable } from '@angular/core';
import { ExportService } from '@shared/services/export/export.service';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import {
  MagicItemTable,
  MagicItemTableEntry,
} from '@treasure/treasure-common/model/magic-item.model';
import { TreasureMap } from '@treasure/treasure-common/model/treasure-map.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapOrMagicControllerServiceService {
  private enteringMagicItemSource: BehaviorSubject<boolean> =
    new BehaviorSubject(true);
  private get enteringMagicItem(): boolean {
    return cloneObject(this.enteringMagicItemSource.value);
  }
  private set enteringMagicItem(isMagicItem: boolean) {
    this.enteringMagicItemSource.next(isMagicItem);
  }

  private magicItemTableSource: BehaviorSubject<MagicItemTable> =
    new BehaviorSubject(new MagicItemTable());
  private get magicItemTable(): MagicItemTable {
    return cloneObject(this.magicItemTableSource.value);
  }
  private set magicItemTable(newTable: MagicItemTable) {
    this.magicItemTableSource.next(newTable);
  }

  enteringMagicItem$: Observable<boolean> =
    this.enteringMagicItemSource.asObservable();
  magicItemTable$: Observable<MagicItemTable> =
    this.magicItemTableSource.asObservable();

  constructor(private exportService: ExportService) {}

  addTableEntry(entry: MagicItemTableEntry): void {
    const nextTable: MagicItemTable = this.magicItemTable;
    nextTable.entries.push(entry);
    this.magicItemTable = nextTable;
  }

  addTreasureMap(entry: TreasureMap): void {
    const entryToAdd: MagicItemTableEntry = new MagicItemTableEntry({
      entry,
    } as MagicItemTableEntry);
    this.addTableEntry(entryToAdd);
  }

  clearTable(): void {
    this.magicItemTable = new MagicItemTable();
  }

  exportTable(): void {
    const exportTable: MagicItemTable = this.magicItemTable;
    this.exportService.exportAsJson(
      exportTable,
      doesExist(exportTable.name) && exportTable.name.length
        ? exportTable.name
        : 'Magic Item'
    );
  }

  importTable(file: File): void {
    this.importJSONFileToSubject(file, this.magicItemTableSource);
  }

  toggleEntryItem(isMagicItem?: boolean): void {
    if (doesExist(isMagicItem)) {
      this.enteringMagicItem = isMagicItem;
    } else {
      this.enteringMagicItem = !this.enteringMagicItem;
    }
  }

  removeEntryAt(index: number): void {
    const nextTable: MagicItemTable = this.magicItemTable;
    nextTable.entries.splice(index, 1);
    this.magicItemTable = nextTable;
  }

  setTableName(name: string): void {
    this.magicItemTable = {
      ...this.magicItemTable,
      name,
    };
  }

  private importJSONFileToSubject(file: File, loadTarget: Subject<any>): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const nextItem = JSON.parse(result);
      loadTarget.next(nextItem);
    });
    fileReader.readAsText(file);
  }
}
