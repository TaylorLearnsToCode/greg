import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-configure-monster-type',
  templateUrl: './configure-monster-type.component.html',
  styleUrls: ['./configure-monster-type.component.scss'],
})
export class ConfigureMonsterTypeComponent implements OnInit {
  readonly PERSISTENCE_TYPE = PERSISTENCE_TYPES.monsterType;

  monsterTypeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.resetForm();
  }

  handleEditItemEvent(monster: MonsterType): void {
    this.resetForm(monster);
  }

  resetForm(monster?: MonsterType): void {
    this.monsterTypeForm = buildFormFromObject(
      new MonsterType(monster)
    ) as FormGroup;
  }
}
