import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';

// TODO: rename to indicate it's a form
@Component({
  selector: 'greg-rollable-table-template',
  templateUrl: './rollable-table-template.component.html',
  styleUrls: ['./rollable-table-template.component.scss'],
})
export class RollableTableTemplateComponent {
  /** The key by which a named entry in the list is identified; default "name" */
  @Input() set entryIdentifier(identifier: string) {
    this._entryIdentifier = identifier;
  }
  get entryIdentifier(): string {
    return doesExist(this._entryIdentifier) ? this._entryIdentifier : 'name';
  }
  /** The file type to be associated with an exported version of the parent form */
  @Input() exportFileType: string;
  /**
   * The FormGroup used to house the table under edit.
   * Should be created from an object which extends AbstractRollableTable.
   */
  @Input() tableForm: FormGroup;

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

  private _entryIdentifier: string;

  constructor(private dataService: DataManagerService) {}

  exportFile(): void {
    this.dataService.exportObject(
      this.tableForm.value,
      `${this.tableForm.value.system}-${this.tableForm.value.name}`,
      this.exportFileType
    );
  }

  /**
   * Removes the form array entry at the specified index from the current table under edit
   * @param  {number} index
   */
  removeEntry(index: number): void {
    this.entriesFormArray.removeAt(index);
  }

  /**
   * Moves the control at a target index one step up or down in the array,
   * as defined by the direction argument.
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftEntry(index: number, direction: string): void {
    let newIndex: number;
    switch (direction) {
      case 'up':
        newIndex = index - 1;
        break;
      case 'down':
        newIndex = index + 1;
        break;
      default:
        throw new Error(`Unsupported direction ${direction} specified.`);
    }
    if (newIndex === -1 || newIndex === this.entriesFormArray.controls.length) {
      return;
    }
    const targetControl = this.entriesFormArray.at(index);
    this.entriesFormArray.removeAt(index);
    this.entriesFormArray.insert(newIndex, targetControl);
  }
}
