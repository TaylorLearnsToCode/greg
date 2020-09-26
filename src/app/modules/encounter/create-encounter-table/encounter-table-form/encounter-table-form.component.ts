import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { areEqual, doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { EncounterTable } from '../model/encounter-table.model';

@Component({
  selector: 'greg-encounter-table-form',
  templateUrl: './encounter-table-form.component.html',
  styleUrls: ['./encounter-table-form.component.scss'],
})
export class EncounterTableFormComponent implements OnInit, OnChanges {
  @Input() encounterTable: EncounterTable;

  encounterTableForm: FormGroup = buildFormFromObject(
    new EncounterTable()
  ) as FormGroup;

  get formDiceRolled(): FormArray {
    return this.encounterTableForm.get('diceRolled') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {
    // console.log(this.encounterTableForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  removeDieRolled(idx?: number): void {
    if (this.formDiceRolled.length > 0) {
      idx = doesExist(idx) ? idx : this.formDiceRolled.length - 1;
      this.formDiceRolled.removeAt(idx);
    }
  }
}
