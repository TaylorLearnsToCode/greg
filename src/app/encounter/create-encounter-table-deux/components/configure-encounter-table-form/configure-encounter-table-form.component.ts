import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EncounterTableTypes } from '@encounter/create-encounter-table-deux/model/encounter-table-types.enum';

@Component({
  selector: 'greg-configure-encounter-table-form',
  templateUrl: './configure-encounter-table-form.component.html',
  styleUrls: ['./configure-encounter-table-form.component.scss'],
})
export class ConfigureEncounterTableFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  readonly ENCOUNTER_TABLE_TYPES: object;
  readonly ENCOUNTER_TABLE_TYPES_ITERABLE: string[];

  constructor() {
    this.ENCOUNTER_TABLE_TYPES = EncounterTableTypes;
    this.ENCOUNTER_TABLE_TYPES_ITERABLE = Object.keys(
      this.ENCOUNTER_TABLE_TYPES
    ).filter((key) => RegExp(/^\d+$/).test(key));
  }

  ngOnInit(): void {}
}
