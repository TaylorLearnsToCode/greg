import { Injectable } from '@angular/core';
import { BoundedRange } from '@shared/model/bounded-range.model';
import { ExportService } from '@shared/services/export/export.service';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import {
  NestedMagicItemTable,
  NestedMagicItemTableEntry,
} from '@treasure/treasure-common/model/magic-item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NestedMagicItemTableControllerService {
  private nestedTableSource: BehaviorSubject<NestedMagicItemTable> =
    new BehaviorSubject(new NestedMagicItemTable());
  private get nestedTable(): NestedMagicItemTable {
    return cloneObject(this.nestedTableSource.value);
  }
  private set nestedTable(newTable: NestedMagicItemTable) {
    this.nestedTableSource.next(newTable);
  }

  nestedTable$: Observable<NestedMagicItemTable> =
    this.nestedTableSource.asObservable();

  constructor(private exportService: ExportService) {}

  addEntry(entry: NestedMagicItemTableEntry): void {
    const nextTable: NestedMagicItemTable = this.nestedTable;
    nextTable.entries.push(entry);
    this.nestedTable = nextTable;
  }

  exportTable(): void {
    const exportTable: NestedMagicItemTable = this.nestedTable;
    this.exportService.exportAsJson(
      exportTable,
      doesExist(exportTable.name) && exportTable.name.length
        ? exportTable.name
        : 'Nested Magic Item Table'
    );
  }

  importEntry(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const newEntry = JSON.parse(result);
      this.addEntry({
        chanceOf: new BoundedRange(),
        entry: newEntry,
      });
    });
    fileReader.readAsText(file);
  }

  setTableName(name: string): void {
    this.nestedTable = {
      ...this.nestedTable,
      name,
    } as NestedMagicItemTable;
  }

  removeEntryAt(index: number): void {
    const nextTable: NestedMagicItemTable = this.nestedTable;
    nextTable.entries.splice(index, 0);
    this.nestedTable = nextTable;
  }
}
