import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { RollableTableComponent } from '@configure/model/rollable-table-component.interface';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { WeaponPowerTable } from '@shared/model/treasure/weapon-power-table.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-configure-weapon-power',
  templateUrl: './configure-weapon-power.component.html',
  styleUrls: ['./configure-weapon-power.component.scss'],
})
export class ConfigureWeaponPowerComponent
  implements RollableTableComponent, OnInit
{
  readonly PERSISTENCE_TYPE: string = PERSISTENCE_TYPES.magicWeaponPowerTable;
  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  weaponPowerEntryForm: FormGroup;
  weaponPowerForm: FormGroup;
  get formEntries(): FormArray {
    return this.weaponPowerForm.get('entries') as FormArray;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.resetWeaponPowerEntryForm();
    this.resetWeaponPowerForm();
  }

  addEntry(entry?: ReferenceEntry) {
    entry = doesExist(entry) ? entry : this.weaponPowerEntryForm.value;
    this.formEntries.push(
      buildFormFromObject(new ReferenceEntry(entry)) as FormGroup
    );
    this.resetWeaponPowerEntryForm();
  }

  handleEditSavedTable(event: WeaponPowerTable): void {
    this.weaponPowerForm = buildFormFromObject(
      new WeaponPowerTable(event)
    ) as FormGroup;
  }

  handleImport(event: WeaponPowerTable): void {
    this.handleEditSavedTable(event);
  }

  handleNestSavedTable(event: WeaponPowerTable): void {
    this.addEntry({
      persistenceType: this.PERSISTENCE_TYPES.magicWeaponPowerTable,
      reference: event.name,
    } as ReferenceEntry);
  }

  resetWeaponPowerEntryForm(): void {
    this.weaponPowerEntryForm = buildFormFromObject(
      new ReferenceEntry({
        persistenceType: this.PERSISTENCE_TYPES.magicWeaponPower,
      })
    ) as FormGroup;
  }

  resetWeaponPowerForm(): void {
    this.weaponPowerForm = buildFormFromObject(
      new WeaponPowerTable()
    ) as FormGroup;
  }

  saveEntry(): void {
    this.dataService.persist(
      this.PERSISTENCE_TYPES.magicWeaponPower,
      this.weaponPowerForm.value
    );
  }
}
