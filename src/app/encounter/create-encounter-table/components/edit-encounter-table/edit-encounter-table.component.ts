import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.enum';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.interface';
import { EncounterRowTypes } from '@encounter/create-encounter-table/model/encounter-row-types.enum';
import { EncounterTable } from '@encounter/encounter-shared/model/encounter-table.model';
import { Encounter } from '@encounter/encounter-shared/model/encounter.model';
import { BoundedRange } from '@shared/model/bounded-range.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { IRollMapping } from '@shared/model/roll-index-mapping.interface';
import {
  areEqual,
  doesExist,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-edit-encounter-table',
  templateUrl: './edit-encounter-table.component.html',
  styleUrls: ['./edit-encounter-table.component.scss'],
})
export class EditEncounterTableComponent implements OnInit, OnChanges {
  @Input() diceRolled: DiceRolled[];
  @Input() encounterRollMapping: IRollMapping[];
  @Input() encounters: Array<Encounter | EncounterTable>;
  @Input() isNested: boolean;
  @Output() createEncounterTableAction = new EventEmitter<
    ICreateEncounterTableAction
  >();

  readonly ROW_TYPES = EncounterRowTypes;

  get encountersForm(): FormArray {
    return this.form.get('encounters') as FormArray;
  }
  form: FormGroup = new FormGroup({
    encounterRollMapping: new FormArray([]),
    encounters: new FormArray([]),
  });
  get mappingForm(): FormArray {
    return this.form.get('encounterRollMapping') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (doesExist(changes.encounterRollMapping)) {
      this.onMappingChange(changes.encounterRollMapping);
    }
    if (doesExist(changes.encounters)) {
      this.onEncountersChange(changes.encounters);
    }
  }

  addBlankRow(idx?: number): void {
    this.addFormRow(idx);
  }

  addEncounter(idx?: number): void {
    this.addFormRow(idx, true);
  }

  addTable(idx?: number): void {
    this.addFormRow(idx, false);
  }

  clearTable(): void {
    this.encountersForm.clear();
    this.mappingForm.clear();
  }

  editAsEncounter(idx: number): void {
    this.editFormRow(idx, true);
  }

  editAsTable(idx: number): void {
    this.editFormRow(idx, false);
  }

  inferTable(): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableAction.INFER_ENCOUNTERS,
    } as ICreateEncounterTableAction);
  }

  formType(idx: number): EncounterRowTypes {
    const targetValue = this.encountersForm.controls[idx].value;
    if (isEmpty(targetValue)) {
      return EncounterRowTypes.UNDEFINED;
    } else if (doesExist(targetValue.encounters)) {
      return EncounterRowTypes.TABLE;
    } else if (doesExist(targetValue.monsters)) {
      return EncounterRowTypes.ENCOUNTER;
    } else {
      throw Error(`Unable to determine row content at index ${idx}`);
    }
  }

  removeRow(idx: number): void {
    this.mappingForm.removeAt(idx);
    this.encountersForm.removeAt(idx);
  }

  saveTable(): void {
    const sendTable = new EncounterTable({
      encounterRollMapping: this.mappingForm.value,
      encounters: this.encountersForm.value,
    } as EncounterTable);
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableAction.SAVE_ENCOUNTERS,
      payload: sendTable,
    } as ICreateEncounterTableAction);
  }

  private addFormRow(idx?: number, isCreature?: boolean): void {
    const newRowContentControl = doesExist(isCreature)
      ? buildFormFromObject(isCreature ? new Encounter() : new EncounterTable())
      : new FormControl({});
    const newMapping = {} as IRollMapping;
    if (doesExist(idx)) {
      newMapping.index = idx;
      newMapping.roll = new BoundedRange({ range: [idx, idx] } as BoundedRange);
      this.encountersForm.insert(idx + 1, newRowContentControl);
      this.mappingForm.insert(idx + 1, buildFormFromObject(newMapping));
    } else {
      this.encountersForm.push(newRowContentControl);
      newMapping.index = this.encountersForm.length;
      newMapping.roll = new BoundedRange({
        range: [newMapping.index + 1, newMapping.index + 1],
      } as BoundedRange);
      this.mappingForm.push(buildFormFromObject(newMapping));
    }
  }

  private editFormRow(idx: number, isCreature?: boolean): void {
    const rowContentControl = doesExist(isCreature)
      ? buildFormFromObject(isCreature ? new Encounter() : new EncounterTable())
      : new FormControl({});
    this.encountersForm.setControl(idx, rowContentControl);
  }

  private onEncountersChange(change: SimpleChange): void {
    if (!areEqual(change.currentValue, change.previousValue)) {
      this.form.setControl(
        'encounters',
        buildFormFromObject(change.currentValue)
      );
      this.reconcileMapping();
    }
  }

  private onMappingChange(change: SimpleChange): void {
    if (!areEqual(change.currentValue, change.previousValue)) {
      this.form.setControl(
        'encounterRollMapping',
        buildFormFromObject(change.currentValue)
      );
      this.reconcileMapping();
    }
  }

  private reconcileMapping(): void {
    this.mappingForm.controls.forEach((control, index) =>
      control.patchValue({ index })
    );
  }
}
