import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { ReferenceEntry } from '@shared/model/dao/reference-entry.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'greg-configure-magic-item-table',
  templateUrl: './configure-magic-item-table.component.html',
  styleUrls: ['./configure-magic-item-table.component.scss'],
})
export class ConfigureMagicItemTableComponent implements OnInit {
  @ViewChild('magicItemTableImport') magicItemTableImportRef: ElementRef;
  @ViewChild('magicItemTableListImport')
  magicItemTableListImportRef: ElementRef;

  readonly MAGIC_ITEM_TABLE: string;

  chanceOfRangeForm(index: number): FormGroup {
    return this.magicItemEntriesFormArray.controls[index].get(
      'chanceOfRange'
    ) as FormGroup;
  }
  get diceToRollForm(): FormGroup {
    return this.magicItemTableForm.get('diceToRoll') as FormGroup;
  }
  get magicItemEntriesFormArray(): FormArray {
    return this.magicItemTableForm.get('entries') as FormArray;
  }
  magicItemTableForm: FormGroup;
  magicItemTables$: Observable<ReferenceEntryTable[]>;
  magicItems$: Observable<MagicItem[]>;
  supportedSystem(key: string): string {
    return (this.SUPPORTED_SYSTEMS as any)[key];
  }
  get supportedSystemKeys(): string[] {
    return Object.keys(this.SUPPORTED_SYSTEMS);
  }

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  private get magicItemTableImport(): HTMLInputElement {
    return this.magicItemTableImportRef.nativeElement as HTMLInputElement;
  }
  private get magicItemTableListImport(): HTMLInputElement {
    return this.magicItemTableListImportRef.nativeElement as HTMLInputElement;
  }

  constructor(private dataService: DataManagerService) {
    this.MAGIC_ITEM_TABLE = this.PERSISTENCE_TYPES.magicItemTable;
  }

  ngOnInit(): void {
    this.magicItemTables$ = this.dataService.dataState$.pipe(
      map((state) => state.magicItemTables)
    );
    this.magicItems$ = this.dataService.dataState$.pipe(
      map((state) => state.magicItems)
    );
    this.clearForm();
  }

  /**
   * Creates a reference from a provided addition and adds it to the active form
   *
   * @param  {MagicItem|ReferenceEntryTable} addition
   */
  addToForm(addition: MagicItem | ReferenceEntryTable): void {
    const persistenceType = doesExist((addition as any).entries)
      ? this.PERSISTENCE_TYPES.magicItemTable
      : this.PERSISTENCE_TYPES.magicItem;

    if (
      persistenceType === this.PERSISTENCE_TYPES.magicItemTable &&
      (addition as ReferenceEntryTable).name ===
        this.magicItemTableForm.value.name &&
      (addition as ReferenceEntryTable).system ==
        this.magicItemTableForm.value.system
    ) {
      throw new Error('Cannot nest a table in itself!');
    }

    const referenceToAdd = buildFormFromObject(
      new ReferenceEntry({
        reference: addition.name,
        persistenceType,
      } as ReferenceEntry)
    );
    referenceToAdd.get('reference')?.disable();
    this.magicItemEntriesFormArray.push(referenceToAdd);
  }

  /** Resets the magic item table form to a clean state */
  clearForm(): void {
    this.magicItemTableForm = buildFormFromObject(
      new ReferenceEntryTable()
    ) as FormGroup;
  }

  /** Removes all saved magic item tables from browser storage */
  clearTables(): void {
    this.dataService.clear(this.PERSISTENCE_TYPES.magicItemTable);
  }

  /**
   * Removes a target table from browser storage.
   *
   * @param  {ReferenceEntryTable} table
   */
  deleteTable(table: ReferenceEntryTable): void {
    this.dataService.delete(table, this.PERSISTENCE_TYPES.magicItemTable);
  }

  /**
   * Pushes a specified table to the active form for edit.
   *
   * @param  {ReferenceEntryTable} table
   */
  editTable(table: ReferenceEntryTable): void {
    this.enableDisableFormEntries('enable');
    this.magicItemTableForm = buildFormFromObject(
      new ReferenceEntryTable(table)
    ) as FormGroup;
    this.enableDisableFormEntries('disable');
  }

  /** Exports the current under-work table to a file on the user's local machine */
  exportMagicItemTable(): void {
    this.enableDisableFormEntries('enable');
    this.dataService.exportObject(
      this.magicItemTableForm.value,
      `${this.magicItemTableForm.value.system}-${this.magicItemTableForm.value.name}`,
      this.PERSISTENCE_TYPES.magicItemTable.toUpperCase()
    );
    this.enableDisableFormEntries('disable');
  }

  /** Exports the current stored magic item tables to the user's local machine */
  exportTables(): void {
    this.dataService.exportFromStorage(this.PERSISTENCE_TYPES.magicItemTable);
  }

  /**
   * Fills either the high side or the low side of the chanceOf array based
   * on the values in the other columns.
   *
   * @param  {string} side Accepts "high" or "low"
   */
  fillChanceOf(side: string): void {
    if (side !== 'low' && side !== 'high') {
      throw new Error(`Invalid chance of side ${side} specified.`);
    }

    let constantSide: FormControl;
    let targetSide: FormControl;
    for (let i = 0; i < this.magicItemEntriesFormArray.controls.length; i++) {
      if (side === 'low' && i === 0) {
        this.chanceOfRangeForm(i).get(side)?.setValue(1);
        continue;
      } else if (
        side === 'high' &&
        i == this.magicItemEntriesFormArray.controls.length - 1
      ) {
        const max = this.magicItemTableForm.value.diceToRoll.pips;
        this.chanceOfRangeForm(i).get(side)?.setValue(max);
        continue;
      }

      targetSide = this.chanceOfRangeForm(i).get(side) as FormControl;
      constantSide =
        side === 'low'
          ? (this.chanceOfRangeForm(i - 1).get('high') as FormControl)
          : (this.chanceOfRangeForm(i + 1).get('low') as FormControl);

      targetSide.setValue(
        side === 'low' ? constantSide.value + 1 : constantSide.value - 1
      );
    }
  }

  /** Returns whether or not the form currently has */
  hasEntries(): boolean {
    return this.magicItemEntriesFormArray.controls.length > 0;
  }

  /** Click handler for the import of a single magic item table for edit in the local form */
  importMagicItemTable(): void {
    this.magicItemTableImport.click();
  }

  /** Click handler for the import of file tables into storage */
  importTables(): void {
    this.magicItemTableListImport.click();
  }

  /**
   * Returns whether or not a given magic item table is eligible to nest as a reference
   * in the current table under work in the magic item table form.
   *
   * @param  {ReferenceEntryTable} magicItemTable
   */
  isNestable(magicItemTable: ReferenceEntryTable): string[] {
    return magicItemTable.name === this.magicItemTableForm.value.name &&
      magicItemTable.system == this.magicItemTableForm.value.system
      ? ['not-nestable', 'list-item']
      : ['list-item'];
  }

  /** Event handler for upload of magic item tables for import */
  onMagicItemTableImport(): void {
    if (this.magicItemTableImport.files?.length) {
      (
        this.dataService.import(
          this.magicItemTableImport.files[0]
        ) as Observable<ReferenceEntryTable[]>
      ).subscribe((table) => {
        this.enableDisableFormEntries('enable');
        this.magicItemTableForm = buildFormFromObject(
          new ReferenceEntryTable(table)
        ) as FormGroup;
        this.magicItemTableImport.value = '';
        this.enableDisableFormEntries('disable');
      });
    }
  }

  /** Event handler for upload of magic item tables for import */
  onMagicItemTableListImport(): void {
    if (this.magicItemTableListImport.files?.length) {
      this.enableDisableFormEntries('enable');
      this.dataService.import(
        this.magicItemTableListImport.files[0],
        this.PERSISTENCE_TYPES.magicItemTable
      );
      this.enableDisableFormEntries('disable');
    }
  }

  /**
   * Removes the reference from the active form at the given index
   *
   * @param  {number} index
   */
  removeReference(index: number): void {
    this.magicItemEntriesFormArray.removeAt(index);
  }

  /**
   * Persists the current magic item table into browser storage.
   * Overwrites if a duplicate system and name are found.
   */
  saveTable(): void {
    this.enableDisableFormEntries('enable');
    this.dataService.persist(
      this.PERSISTENCE_TYPES.magicItemTable,
      this.magicItemTableForm.value
    );
    this.enableDisableFormEntries('disable');
  }

  /**
   * Moves the target reference up or down in the array, according
   * to the provided directional string
   *
   * @param  {number} index
   * @param  {string} direction Accepts 'up' or 'down'
   */
  shiftArticle(index: number, direction: string): void {
    const targetControl = this.magicItemEntriesFormArray.at(index);
    let newIndex = index;
    switch (direction) {
      case 'up':
        newIndex--;
        break;
      case 'down':
        newIndex++;
        break;
      default:
        throw new Error(`Invalid direction provided: ${direction}`);
    }
    this.magicItemEntriesFormArray.removeAt(index);
    this.magicItemEntriesFormArray.insert(newIndex, targetControl);
  }

  /**
   * Enables or disables the reference field according to the provided option
   *
   * @param  {string} option Accepts "enable" or "disable"
   */
  private enableDisableFormEntries(option: string): void {
    this.magicItemEntriesFormArray.controls.forEach((control) => {
      switch (option) {
        case 'enable':
          control.get('reference')?.enable();
          break;
        case 'disable':
          control.get('reference')?.disable();
          break;
        default:
          throw new Error(`Unsupported option ${option} specified.`);
      }
    });
  }
}
