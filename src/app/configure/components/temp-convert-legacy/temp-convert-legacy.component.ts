import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { LAbstractTable } from '@configure/model/TEMP/legacy-abstract-table.model';
import { LMagicItemTable } from '@configure/model/TEMP/legacy-magic-item-table.model';
import { LMagicItem } from '@configure/model/TEMP/legacy-magic-item.model';
import { DataState } from '@shared/model/dao/data-state.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-temp-convert-legacy',
  templateUrl: './temp-convert-legacy.component.html',
  styleUrls: ['./temp-convert-legacy.component.scss'],
})
/* NEXT GOAL: convert the old magic item lists to the new format */
export class TempConvertLegacyComponent implements OnInit {
  @ViewChild('importInput') importInputRef: ElementRef;

  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  dataState$: Observable<DataState>;
  get importInput(): HTMLInputElement {
    return this.importInputRef.nativeElement as HTMLInputElement;
  }
  legacyItemTable: LMagicItemTable = {} as LMagicItemTable;
  magicItemLists: ReferenceEntryTable[] = [];
  magicItems: MagicItem[] = [];

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.dataState$ = this.dataService.dataState$;
  }

  convert(): void {
    this.reset();
    this.deriveItems(this.legacyItemTable);
    this.deriveTables(this.legacyItemTable);
  }

  import(): void {
    this.importInput.click();
  }

  indicateSaved(itemName: string, namedItems: any[]): string {
    return namedItems.findIndex((i) => i.name === itemName) !== -1 ? '*' : '';
  }

  onImport(): void {
    if (this.importInput.files?.length) {
      (
        this.dataService.import<LMagicItemTable>(
          this.importInput.files[0]
        ) as Observable<LMagicItemTable>
      ).subscribe((val) => {
        this.legacyItemTable = val;
        this.importInput.value = '';
      });
    }
  }

  reset(): void {
    this.magicItems = [];
    this.magicItemLists = [];
  }

  saveAll(): void {
    for (const item of this.magicItems) {
      this.dataService.persist(this.PERSISTENCE_TYPES.magicItem, item);
    }
    for (const list of this.magicItemLists) {
      this.dataService.persist(this.PERSISTENCE_TYPES.magicItemTable, list);
    }
  }

  showTableCounts(table: ReferenceEntryTable): string {
    return ''.concat(
      'Items: ',
      table.entries
        .filter(
          (entry) => entry.persistenceType === this.PERSISTENCE_TYPES.magicItem
        )
        .length.toString(),
      ', Tables: ',
      table.entries
        .filter(
          (entry) =>
            entry.persistenceType === this.PERSISTENCE_TYPES.magicItemTable
        )
        .length.toString()
    );
  }

  private deriveItems(table: LMagicItemTable): void {
    let itemRef: LMagicItem | LAbstractTable;
    for (const entry of table.entries) {
      itemRef = entry.item;
      if (!doesExist((itemRef as any).entries)) {
        this.magicItems.push(
          new MagicItem({
            name: this.deriveItemName(itemRef),
            quantity: 1,
          } as MagicItem)
        );
      } else {
        this.deriveItems(itemRef as LMagicItemTable);
      }
    }
  }

  private deriveTables(table: LMagicItemTable): void {
    let itemRef: LMagicItem | LAbstractTable;
    const referenceEntries: ReferenceEntry[] = [];
    for (const entry of table.entries) {
      itemRef = entry.item;
      referenceEntries.push(
        new ReferenceEntry({
          chanceOf: new BoundedRange(entry.chanceOf),
          reference: doesExist((itemRef as any).entries)
            ? itemRef.name
            : this.deriveItemName(itemRef),
          persistenceType: doesExist((itemRef as any).entries)
            ? this.PERSISTENCE_TYPES.magicItemTable
            : this.PERSISTENCE_TYPES.magicItem,
        } as ReferenceEntry)
      );
      if (doesExist((itemRef as any).entries)) {
        this.deriveTables(itemRef as LAbstractTable);
      }
    }
    const newTable: ReferenceEntryTable = new ReferenceEntryTable({
      diceToRoll: new DiceRolled(table.diceToRoll),
      name: table.name,
      system: SUPPORTED_SYSTEMS.LBB,
      entries: referenceEntries,
    } as ReferenceEntryTable);
    this.magicItemLists.push(newTable);
  }

  private deriveItemName(ref: any): string {
    return ref.name;
  }
}
