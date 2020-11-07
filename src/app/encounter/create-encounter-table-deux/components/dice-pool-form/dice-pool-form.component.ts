import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-dice-pool-form',
  templateUrl: './dice-pool-form.component.html',
  styleUrls: ['./dice-pool-form.component.scss'],
})
export class DicePoolFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  get diceFormArray(): FormArray {
    return this.parentForm.get('diceRolled') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  addDieRolled(idx?: number): void {
    doesExist(idx)
      ? this.diceFormArray.insert(
          idx + 1,
          buildFormFromObject(new DiceRolled())
        )
      : this.diceFormArray.push(buildFormFromObject(new DiceRolled()));
  }

  removeDieRolled(idx: number): void {
    if (doesExist(idx)) {
      this.diceFormArray.removeAt(idx);
    } else {
      throw Error('Index is required to remove a die rolled.');
    }
  }
}
