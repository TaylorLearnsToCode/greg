import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { ReferenceEntry } from '@shared/model/dao/reference-entry.model';
import { MagicItemTable } from '@shared/model/treasure/magic-item-table.model';
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
  magicItemTables$: Observable<MagicItemTable[]>;
  magicItems$: Observable<MagicItem[]>;
  supportedSystem(key: string): string {
    return (this.SUPPORTED_SYSTEMS as any)[key];
  }
  get supportedSystemKeys(): string[] {
    return Object.keys(this.SUPPORTED_SYSTEMS);
  }

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  constructor(private dataService: DataManagerService) {}

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
   * @param  {MagicItem|MagicItemTable} addition
   */
  addToForm(addition: MagicItem | MagicItemTable): void {
    const referenceToAdd = buildFormFromObject(
      new ReferenceEntry({
        reference: addition.name,
        persistenceType: doesExist((addition as any).entries)
          ? this.PERSISTENCE_TYPES.magicItemTable
          : this.PERSISTENCE_TYPES.magicItem,
      } as ReferenceEntry)
    );
    referenceToAdd.get('reference')?.disable();
    this.magicItemEntriesFormArray.push(referenceToAdd);
  }

  /** Resets the magic item table form to a clean state */
  clearForm(): void {
    this.magicItemTableForm = buildFormFromObject(
      new MagicItemTable()
    ) as FormGroup;
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
}
