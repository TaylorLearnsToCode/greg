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
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapOrMagicControllerServiceService {
  private magicItemTableSource: BehaviorSubject<MagicItemTable> =
    new BehaviorSubject(new MagicItemTable());
  private get magicItemTable(): MagicItemTable {
    return cloneObject(this.magicItemTableSource.value);
  }
  private set magicItemTable(newTable: MagicItemTable) {
    this.magicItemTableSource.next(newTable);
  }

  magicItemTable$: Observable<MagicItemTable> =
    this.magicItemTableSource.asObservable();

  constructor(private exportService: ExportService) {}

  addTableEntry(entry: MagicItemTableEntry): void {
    const nextTable: MagicItemTable = this.magicItemTable;
    nextTable.entries.push(entry);
    this.magicItemTable = nextTable;
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

  private importJSONFileToSubject(file: File, loadTarget: Subject<any>): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const nextItem = JSON.parse(result);
      loadTarget.next(nextItem);
    });
    fileReader.readAsText(file);
  }

  removeEntryAt(index: number): void {
    const nextTable: MagicItemTable = this.magicItemTable;
    nextTable.entries.splice(index, 1);
    this.magicItemTable = nextTable;
  }

  setTableName(name: string): void {
    const nextTable: MagicItemTable = this.magicItemTable;
    nextTable.name = name;
    this.magicItemTable = nextTable;
    /* Try this to see if it improves legibility:
    this.magicItemTable = {
      ...this.magicItemTable,
      name
    };
    */
  }
}
