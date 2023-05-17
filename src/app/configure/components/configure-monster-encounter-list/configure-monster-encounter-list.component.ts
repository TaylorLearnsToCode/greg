import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { RollableTableComponent } from '@configure/model/rollable-table-component.interface';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { sortByField } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-configure-monster-encounter-list',
  templateUrl: './configure-monster-encounter-list.component.html',
  styleUrls: ['./configure-monster-encounter-list.component.scss'],
})
export class ConfigureMonsterEncounterListComponent
  implements OnInit, RollableTableComponent
{
  readonly PERSISTENCE_TYPE: string = PERSISTENCE_TYPES.monsterEncounterList;
  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  encounterForm: FormGroup;
  get monsterEntries(): FormArray {
    return this.encounterForm.get('entries') as FormArray;
  }
  savedMonsterList$: Observable<MonsterType[]>;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.resetForm();
    this.savedMonsterList$ = this.dataService.dataState$.pipe(
      map((state) => {
        const monsterTypes: MonsterType[] = state.monsterTypes.map(
          (m) => new MonsterType(m)
        );
        sortByField(monsterTypes);
        return monsterTypes;
      })
    );
  }

  addMonster(monster: MonsterType): void {
    this.monsterEntries.push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: monster.name,
          persistenceType: this.PERSISTENCE_TYPE,
        } as ReferenceEntry)
      ) as FormGroup
    );
  }

  handleEditSavedTable(event: MonsterType): void {
    this.resetForm(event);
  }

  handleImport(event: MonsterType): void {
    this.resetForm(event);
  }

  handleNestSavedTable(event: ReferenceEntryTable): void {
    this.monsterEntries.push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: event.name,
          persistenceType: this.PERSISTENCE_TYPES.monsterEncounterList,
        })
      ) as FormGroup
    );
  }

  private resetForm(table?: any): void {
    this.encounterForm = buildFormFromObject(
      new ReferenceEntryTable(table)
    ) as FormGroup;
  }
}
