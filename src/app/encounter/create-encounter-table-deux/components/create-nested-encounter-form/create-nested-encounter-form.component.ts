import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'greg-create-nested-encounter-form',
  templateUrl: './create-nested-encounter-form.component.html',
  styleUrls: ['./create-nested-encounter-form.component.scss'],
})
export class CreateNestedEncounterFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  get resultMappingForm(): FormArray {
    return this.parentForm.get('resultMapping') as FormArray;
  }
  get encountersForm(): FormArray {
    return this.parentForm.get('encounters') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  addSubtable(idx?: number): void {}

  buildFormTable(): void {}

  removeEncounter(idx: number): void {}
}
