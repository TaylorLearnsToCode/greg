import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { QuantifiableItemComponent } from '@configure/model/quantifiable-item-component.interface';
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

  monsterTypeForm: FormGroup;
  treasureType$: Observable<TreasureType[]>;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.treasureType$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureTypes)
    );
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
