import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-edit-encounter-form',
  templateUrl: './edit-encounter-form.component.html',
  styleUrls: ['./edit-encounter-form.component.scss'],
})
export class EditEncounterFormComponent implements OnInit {
  @Input() encounterForm: FormGroup;

  get monstersArray(): FormArray {
    return this.encounterForm.get('monsters') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  addMonster(idx?: number): void {
    const newControl = buildFormFromObject(new Monster());
    if (doesExist(idx)) {
      this.monstersArray.insert(idx + 1, newControl);
    } else {
      this.monstersArray.push(newControl);
    }
  }

  removeMonster(idx: number): void {
    this.monstersArray.removeAt(idx);
  }
}
