import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EncounterType } from '@encounter/create-encounter-table-deux/model/encounter-types.enum';
import { SaveAsClass } from '@shared/model/save-as.model';

@Component({
  selector: 'greg-create-monster-for-encounter-form',
  templateUrl: './create-monster-for-encounter-form.component.html',
  styleUrls: ['./create-monster-for-encounter-form.component.scss'],
})
export class CreateMonsterForEncounterFormComponent
  implements OnInit, OnChanges {
  @Input() encounterType: EncounterType;
  @Input() monsterForm: FormGroup;

  readonly ENCOUNTER_TYPES = EncounterType;
  readonly SAVE_AS_CLASS_OPTIONS = Object.keys(SaveAsClass).filter(
    (key) => !RegExp(/^\d+$/).test(key)
  );

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
