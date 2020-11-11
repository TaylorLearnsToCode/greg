import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.enum';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.interface';
import { EncounterTableType } from '@encounter/encounter-shared/model/encounter-table-types.enum';
import { areEqual, doesExist } from '@shared/utilities/common-util/common.util';

@Component({
  selector: 'greg-configure-encounter-table',
  templateUrl: './configure-encounter-table.component.html',
  styleUrls: ['./configure-encounter-table.component.scss'],
})
export class ConfigureEncounterTableComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() type: EncounterTableType;
  @Output() createEncounterTableAction = new EventEmitter<
    ICreateEncounterTableAction
  >();

  readonly ENCOUNTER_TABLE_TYPES = EncounterTableType;
  readonly ENCOUNTER_OPTIONS = Object.keys(EncounterTableType).filter(
    (key) => !RegExp(/^\d+$/).test(key)
  );

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
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
  }

  clear(): void {
    this.form.reset();
  }

  reset(): void {
    this.form.patchValue({ name: this.name });
  }

  save(): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableAction.SAVE_CONFIG,
      payload: this.form.value,
    } as ICreateEncounterTableAction);
  }
}
