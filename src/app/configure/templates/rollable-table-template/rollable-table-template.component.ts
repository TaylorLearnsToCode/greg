import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { AbstractRollableTable } from '@shared/model/framework/abstract-rollable-table.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { shiftFormArrayEntry } from '@shared/utilities/form-util/form.util';
import { Observable, map } from 'rxjs';

// TODO: rename to indicate it's a form
@Component({
  selector: 'greg-rollable-table-template',
  templateUrl: './rollable-table-template.component.html',
  styleUrls: ['./rollable-table-template.component.scss'],
})
export class RollableTableTemplateComponent implements OnInit {
  /** The key by which a named entry in the list is identified; default "name" */
  @Input() set entryIdentifier(identifier: string) {
    this._entryIdentifier = identifier;
  }
  get entryIdentifier(): string {
    return doesExist(this._entryIdentifier) ? this._entryIdentifier : 'name';
  }
  /**
   * Whether the entries provided to the saved tables element are nestable
   * in the main form; default true
   */
  @Input() set entriesNestable(add: boolean) {
    this._entriesNestable = add;
  }
  get entriesNestable(): boolean {
    return doesExist(this._entriesNestable) ? this._entriesNestable : true;
  }
  /** The supported persistence type to be associated with an exported version of the parent form */
  @Input() persistenceType: string;
  /**
   * The FormGroup used to house the table under edit.
   * Should be created from an object which extends AbstractRollableTable.
   */
  @Input() tableForm: FormGroup;

  /** Event emitter to produce files for consumption on Import action */
  @Output() importEvent = new EventEmitter();
  /** Event emitter to signal an inbound  */
  @Output() editSavedTableEvent = new EventEmitter();
  /** Event emitter to send a nested reference up for adding to entries */
  @Output() nestSavedTable = new EventEmitter();

  @ViewChild('importTableInput') importTableInputRef: ElementRef;

  /** File type to be sought by the Import button */
  get acceptFileType(): string {
    return this.persistenceType ? `.${this.persistenceType}` : '*';
  }
  /**
   * Pseudo-accessor: returns the FormGroup containing the chanceOf property of
   * an entry in the entries FormArray at the specified index.
   *
   * @param  {number} index
   */
  boundedRangeForm(index: number): FormGroup {
    return this.entriesFormArray.controls[index].get('chanceOf') as FormGroup;
  }
  /** The FormArray containing rollable entries on the table */
  get entriesFormArray(): FormArray {
    return this.tableForm.get('entries') as FormArray;
  }
  /**
   * Pseudo-accessor: returns the name of a given FormArray element, as
   * identified by the configured entry identifier field.
   *
   * @param  {number} index
   */
  entryName(index: number): string {
    return (this.entriesFormArray.value[index] as any)[this.entryIdentifier];
  }
  /** Style classes for the saved table container */
  get savedTableClasses(): string[] {
    return ['saved-tables', this.entriesNestable ? 'nestable' : 'not-nestable'];
  }
  /** Observable representation of tables saved to browser storage */
  savedTableList$: Observable<any>;
  /**
   * Pseudo-accessor: returns a GREG supported game system identified by a
   * provided key value
   *
   * @param  {string} key
   */
  supportedSystem(key: string): string {
    return (this.SUPPORTED_SYSTEMS as any)[key];
  }
  /** A collection of keys for GREG supported systems */
  get supportedSystemKeys(): string[] {
    return Object.keys(this.SUPPORTED_SYSTEMS);
  }

  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;
  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  private _entriesNestable: boolean;
  private _entryIdentifier: string;
  private chanceOfForm(index: number): FormGroup {
    return this.entriesFormArray.controls[index].get('chanceOf') as FormGroup;
  }
  private get importTableInput(): HTMLInputElement {
    return this.importTableInputRef.nativeElement as HTMLInputElement;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.initializeSavedTableListStream();
  }

  /** Removes all tables of the specified persistence type from browser storage. */
  clearSavedTables(): void {
    this.dataService.clear(this.persistenceType);
  }

  /** Resets the parent table form */
  clearTableForm(): void {
    this.editSavedTableEvent.emit({});
  }

  /**
   * Removes a target table from browser storage.
   *
   * @param  {T extends AbstractRollableTable} table
   */
  deleteSavedTable<T extends AbstractRollableTable>(table: T): void {
    this.dataService.delete(table, this.persistenceType);
  }

  /**
   * Rebuilds the target form using a provided table. Unsaved changes will be lost.
   *
   * @param  {T extends AbstractRollableTable} table
   */
  editSavedTable<T extends AbstractRollableTable>(table: T): void {
    this.editSavedTableEvent.emit(table);
  }

  /** Exports the provided parent table's value to the user's local machine */
  exportFile(): void {
    this.dataService.exportObject(
      this.tableForm.value,
      `${this.tableForm.value.system}-${this.tableForm.value.name}`,
      this.persistenceType.toUpperCase()
    );
  }

  /**
   *
   *
   * @param  {string} side Accepts "high" or "low", case sensitive
   */
  fillChanceOf(side: string): void {
    if (side !== 'low' && side !== 'high') {
      throw new Error(`Invalid chance of side ${side} specified.`);
    }

    let constantSide: FormControl;
    let targetSide: FormControl;
    for (let i = 0; i < this.entriesFormArray.controls.length; i++) {
      if (side === 'low' && i === 0) {
        this.chanceOfForm(i).get(side)?.setValue(1);
        continue;
      } else if (
        side === 'high' &&
        i == this.entriesFormArray.controls.length - 1
      ) {
        const max = this.entriesFormArray.value.diceRolled.pips;
        this.chanceOfForm(i).get(side)?.setValue(max);
        continue;
      }

      targetSide = this.chanceOfForm(i).get(side) as FormControl;
      constantSide =
        side === 'low'
          ? (this.chanceOfForm(i - 1).get('high') as FormControl)
          : (this.chanceOfForm(i + 1).get('low') as FormControl);

      targetSide.setValue(
        side === 'low' ? constantSide.value + 1 : constantSide.value - 1
      );
    }
  }

  /**
   * Opens a prompt, enabling the user to select and import a table to work on.
   * When an import occurs, the resulting JSON is emitted upwards.
   */
  importFile(): void {
    this.importTableInput.click();
  }

  /**
   * Emits a target table, delegating its addition to the
   * @param  {AbstractRollableTable} table
   */
  nestTable(table: AbstractRollableTable): void {
    this.nestSavedTable.emit(table);
  }

  /** Handler method for file import event */
  onImportFile<T>(): void {
    if (this.importTableInput.files?.length) {
      (
        this.dataService.import<T>(
          this.importTableInput.files[0]
        ) as Observable<T>
      ).subscribe((file) => this.importEvent.emit(file));
    } else {
      throw new Error('No file found for import.');
    }
  }

  /**
   * Removes the form array entry at the specified index from the current table under edit
   * @param  {number} index
   */
  removeEntry(index: number): void {
    this.entriesFormArray.removeAt(index);
  }

  /** Persists the value of the table form under edit to browser storage */
  saveTableForm(): void {
    this.dataService.persist(this.persistenceType, this.tableForm.value);
  }

  /**
   * Moves the control at a target index one step up or down in the array,
   * as defined by the direction argument.
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftEntry(index: number, direction: string): void {
    shiftFormArrayEntry(index, direction, this.entriesFormArray);
  }

  /**
   * Delegating to the data manager service, moves the target table up or down
   * in its respective list.
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftTable(index: number, direction: string): void {
    this.dataService.shiftListEntry(this.persistenceType, index, direction);
  }

  /**
   * Based on the input persistence type, attempts to isolate the active list from the data
   * manager state stream for display/use in the rollable table.
   */
  private initializeSavedTableListStream(): void {
    const stateParam =
      Object.keys(this.PERSISTENCE_TYPES).find(
        (key) => (this.PERSISTENCE_TYPES as any)[key] === this.persistenceType
      ) + 's';
    this.savedTableList$ = this.dataService.dataState$.pipe(
      map((state) => (state as any)[stateParam])
    );
  }
}
