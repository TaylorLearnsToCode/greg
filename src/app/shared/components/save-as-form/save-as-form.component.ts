import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SaveAsClass } from '@shared/model/save-as-class.enum';

@Component({
  selector: 'greg-save-as-form',
  templateUrl: './save-as-form.component.html',
  styleUrls: ['./save-as-form.component.scss'],
})
export class SaveAsFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  readonly AS_CLASS = SaveAsClass;
  readonly AS_CLASS_OPTIONS = Object.keys(SaveAsClass).filter(
    (key) => !RegExp(/^\d+$/).test(key)
  );

  get saveAsForm(): FormGroup {
    return this.parentForm.get('saveAs') as FormGroup;
  }

  constructor() {}

  ngOnInit(): void {}
}
