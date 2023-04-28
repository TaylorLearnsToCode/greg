import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { QuantifiableItemComponent } from '@configure/model/quantifiable-item-component.interface';
import { MonsterConsort } from '@shared/model/monster/monster-consort.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-configure-monster-type',
  templateUrl: './configure-monster-type.component.html',
  styleUrls: ['./configure-monster-type.component.scss'],
})
export class ConfigureMonsterTypeComponent
  implements OnInit, QuantifiableItemComponent
{
  readonly PERSISTENCE_TYPE = PERSISTENCE_TYPES.monsterType;

  get consortsFormArray(): FormArray {
    return this.monsterTypeForm.get('consorts') as FormArray;
  }
  consortQuantityForm(index: number): FormGroup {
    return this.consortsFormArray.at(index).get('quantity') as FormGroup;
  }
  monsterTypeForm: FormGroup;
  get retinueFormArray(): FormArray {
    return this.monsterTypeForm.get('retinue') as FormArray;
  }
  retinueQuantityForm(index: number): FormGroup {
    return this.retinueFormArray.at(index).get('quantity') as FormGroup;
  }
  treasureType$: Observable<TreasureType[]>;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.treasureType$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureTypes)
    );
    this.resetForm();
  }

  addConsort(): void {
    this.consortsFormArray.push(
      buildFormFromObject(
        new MonsterConsort({
          system: this.monsterTypeForm.value.system,
        })
      ) as FormGroup
    );
  }

  addRetinue(): void {
    this.retinueFormArray.push(
      buildFormFromObject(
        new MonsterType({
          system: this.monsterTypeForm.value.system,
        })
      ) as FormGroup
    );
  }

  handleEditItemEvent(monster: MonsterType): void {
    this.resetForm(monster);
  }

  removeConsort(index: number): void {
    this.consortsFormArray.removeAt(index);
  }

  removeRetinue(index: number): void {
    this.retinueFormArray.removeAt(index);
  }

  resetForm(monster?: MonsterType): void {
    this.monsterTypeForm = buildFormFromObject(
      new MonsterType(monster)
    ) as FormGroup;
  }
}
