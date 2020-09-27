import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { areEqual, doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../model/encounter-table.model';

@Component({
  selector: 'greg-encounter-table-form',
  templateUrl: './encounter-table-form.component.html',
  styleUrls: ['./encounter-table-form.component.scss'],
})
export class EncounterTableFormComponent implements OnInit, OnChanges {
  @Input() encounterTable: EncounterTable;
  @Output() encounterTableAction = new EventEmitter<IEncounterTableAction>();

  encounterTableForm: FormGroup = buildFormFromObject(
    new EncounterTable()
  ) as FormGroup;
  get formDiceRolled(): FormArray {
    return this.encounterTableForm.get('diceRolled') as FormArray;
  }
  get formEncounters(): FormArray {
    return this.encounterTableForm.get('encounters') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.encounterTableForm);
    if (changes.encounterTable) {
      if (
        !areEqual(
          changes.encounterTable.currentValue,
          changes.encounterTable.previousValue
        )
      ) {
        this.encounterTableForm.patchValue(changes.encounterTable.currentValue);
      }
    }
  }

  addDieRolled(): void {
    this.formDiceRolled.push(buildFormFromObject(new DiceRolled(1, 6)));
  }

  clearDiceRolled(): void {
    while (this.formDiceRolled.length > 0) {
      this.formDiceRolled.removeAt(0);
    }
  }

  removeDieRolled(idx: number): void {
    if (this.validateDieRemove(idx)) {
      this.formDiceRolled.removeAt(idx);
    }
  }

  updateTable(): void {
    this.encounterTableAction.emit({
      action: EncounterTableActions.UPDATE_DICE_ROLLED,
      payload: this.formDiceRolled.value,
    } as IEncounterTableAction);
  }

  private validateDieRemove(idx: number): boolean {
    if (!doesExist(idx)) {
      throw new Error('Index Number is Required');
    }
    return this.formDiceRolled.length > 0;
  }
}
