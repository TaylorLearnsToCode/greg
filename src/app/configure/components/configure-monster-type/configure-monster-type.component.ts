import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { QuantifiableItemComponent } from '@configure/model/quantifiable-item-component.interface';
import { TreasureArticleForm } from '@configure/model/treasure-article-form.interface';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { MonsterConsort } from '@shared/model/monster/monster-consort.model';
import { MonsterRetinue } from '@shared/model/monster/monster-retinue.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-configure-monster-type',
  templateUrl: './configure-monster-type.component.html',
  styleUrls: ['./configure-monster-type.component.scss'],
})
export class ConfigureMonsterTypeComponent
  implements OnInit, QuantifiableItemComponent, TreasureArticleForm
{
  readonly PERSISTENCE_TYPE = PERSISTENCE_TYPES.monsterType;

  get consortsFormArray(): FormArray {
    return this.monsterTypeForm.get('consorts') as FormArray;
  }
  consortQuantityForm(index: number): FormGroup {
    return this.consortsFormArray.at(index).get('quantity') as FormGroup;
  }
  get isBx(): boolean {
    return this.monsterTypeForm.value.system === 'BX';
  }
  monsterTypeForm: FormGroup;
  get retinueFormArray(): FormArray {
    return this.monsterTypeForm.get('retinue') as FormArray;
  }
  retinueQuantityForm(index: number): FormGroup {
    return this.retinueFormArray.at(index).get('quantity') as FormGroup;
  }
  savedMonsterList$: Observable<ReferenceEntryTable[]>;
  treasurePerCapForm: FormGroup;
  get treasurePerCapFormArray(): FormArray {
    return this.monsterTypeForm.get('treasurePerCap') as FormArray;
  }
  treasureType$: Observable<TreasureType[]>;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.savedMonsterList$ = this.dataService.dataState$.pipe(
      map((state) => state.monsterEncounterLists)
    );
    this.treasureType$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureTypes)
    );
    this.resetForm();
    this.resetTreasurePerCapForm();
  }

  addConsort(consort?: any): void {
    const baseConsort: MonsterConsort = new MonsterConsort({
      system: this.monsterTypeForm.value.system,
    });
    if (doesExist(consort)) {
      baseConsort.name = consort.name;
    }
    this.consortsFormArray.push(buildFormFromObject(baseConsort) as FormGroup);
  }

  addRetinue(retinue?: any): void {
    const baseRetinue = new MonsterRetinue({
      system: this.monsterTypeForm.value.system,
    });
    if (doesExist(retinue)) {
      baseRetinue.name = retinue.name;
    }
    this.retinueFormArray.push(buildFormFromObject(baseRetinue) as FormGroup);
  }

  addTreasurePerCap(): void {
    const index: number = (
      this.treasurePerCapFormArray.value as TreasureArticle[]
    ).findIndex((val) => val.name === this.treasurePerCapForm.value.name);
    if (index !== -1) {
      this.treasurePerCapFormArray
        .at(index)
        .patchValue(
          buildFormFromObject(
            new TreasureArticle(this.treasurePerCapForm.value)
          ).value
        );
    } else {
      this.treasurePerCapFormArray.push(
        buildFormFromObject(
          new TreasureArticle(this.treasurePerCapForm.value)
        ) as FormControl
      );
    }
    this.resetTreasurePerCapForm();
  }

  handleEditItemEvent(monster: MonsterType): void {
    this.resetForm(monster);
  }

  handleRemoveArticle(identifier: any): void {
    throwError('Method not implemented.');
  }

  handleShiftArticle(identifier: any, direction: string): void {
    throwError('Method not implemented.');
  }

  removeConsort(index: number): void {
    this.consortsFormArray.removeAt(index);
  }

  removeRetinue(index: number): void {
    this.retinueFormArray.removeAt(index);
  }

  removeTreasurePerCap(index: number): void {
    this.treasurePerCapFormArray.removeAt(index);
  }

  resetForm(monster?: MonsterType): void {
    this.monsterTypeForm = buildFormFromObject(
      new MonsterType(monster)
    ) as FormGroup;
  }

  resetTreasurePerCapForm(treasure?: TreasureArticle): void {
    this.treasurePerCapForm = buildFormFromObject(
      new TreasureArticle(treasure)
    ) as FormGroup;
  }
}
