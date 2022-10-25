import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.enum';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.interface';
import { EncounterLocation } from '@encounter/encounter-shared/model/encounter-locationS.enum';
import { EncounterTableType } from '@encounter/encounter-shared/model/encounter-table-types.enum';
import { areEqual, doesExist } from '@shared/utilities/common-util/common.util';

@Component({
  selector: 'greg-configure-encounter-table',
  templateUrl: './configure-encounter-table.component.html',
  styleUrls: ['./configure-encounter-table.component.scss'],
})
export class ConfigureEncounterTableComponent implements OnInit, OnChanges {
  @Input() location: EncounterLocation;
  @Input() name: string;
  @Input() type: EncounterTableType;
  @Output() createEncounterTableAction = new EventEmitter<
    ICreateEncounterTableAction
  >();

  readonly LOCATION_TYPES = EncounterLocation;
  readonly LOCATION_OPTIONS = Object.keys(EncounterLocation).filter(
    (key) => !RegExp(/^\d+$/).test(key)
  );
  readonly ENCOUNTER_TABLE_TYPES = EncounterTableType;
  readonly ENCOUNTER_OPTIONS = Object.keys(EncounterTableType).filter(
    (key) => !RegExp(/^\d+$/).test(key)
  );

  form: UntypedFormGroup = new UntypedFormGroup({
    location: new UntypedFormControl(),
    name: new UntypedFormControl(),
    type: new UntypedFormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      doesExist(changes.name) &&
      !areEqual(changes.name.previousValue, changes.name.currentValue)
    ) {
      this.form.patchValue({ name: changes.name.currentValue });
    }
    if (
      doesExist(changes.type) &&
      !areEqual(changes.type.previousValue, changes.type.currentValue)
    ) {
      this.form.patchValue({
        type: changes.type.currentValue as EncounterTableType,
      });
    }
    if (
      doesExist(changes.location) &&
      !areEqual(changes.location.previousValue, changes.location.currentValue)
    ) {
      this.form.patchValue({
        location: changes.location.currentValue as EncounterLocation,
      });
    }
  }

  clear(): void {
    this.form.reset();
  }

  reset(): void {
    this.form.patchValue({
      location: this.location,
      name: this.name,
      type: this.type,
    });
  }

  save(): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableAction.SAVE_CONFIG,
      payload: this.form.value,
    } as ICreateEncounterTableAction);
  }
}
