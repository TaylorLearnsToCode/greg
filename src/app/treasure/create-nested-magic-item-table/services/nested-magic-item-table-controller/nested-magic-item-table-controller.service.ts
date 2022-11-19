import { Injectable } from '@angular/core';
import { ExportService } from '@shared/services/export/export.service';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import {
  MagicItemTable,
  NestedMagicItemTable,
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

  addEntry(entry: MagicItemTable): void {
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
