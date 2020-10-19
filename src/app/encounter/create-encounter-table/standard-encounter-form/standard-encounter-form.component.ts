import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'greg-standard-encounter-form',
  templateUrl: './standard-encounter-form.component.html',
  styleUrls: ['./standard-encounter-form.component.scss'],
})
export class StandardEncounterFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  get formEncounters(): FormArray {
    return this.parentForm.get('encounters') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}
}
