import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { RollableTableComponent } from '@configure/model/rollable-table-component.interface';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { sortByField } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-configure-treasure-list',
  templateUrl: './configure-treasure-list.component.html',
  styleUrls: ['./configure-treasure-list.component.scss'],
})
export class ConfigureTreasureListComponent
  implements OnInit, RollableTableComponent
{
  readonly PERSISTENCE_TYPE: string = PERSISTENCE_TYPES.treasureList;

  treasureListForm: FormGroup;
  treasureType$: Observable<TreasureType[]>;
  get treasureTypeEntries(): FormArray {
    return this.treasureListForm.get('entries') as FormArray;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.resetTreasureListForm();
    this.treasureType$ = this.dataService.dataState$.pipe(
      map((state) => {
        const types = state.treasureTypes;
        sortByField(types, 'type');
        return types;
      })
    );
  }

  handleNestSavedTable(event: ReferenceEntryTable): void {
    this.treasureTypeEntries.push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: event.name,
          persistenceType: this.PERSISTENCE_TYPE,
        } as ReferenceEntry)
      ) as FormGroup
    );
  }

  handleEditSavedTable(event: ReferenceEntryTable): void {
    this.resetTreasureListForm(event);
  }

  handleImport(event: ReferenceEntryTable): void {
    this.handleEditSavedTable(event);
  }

  nestType(type: TreasureType): void {
    this.treasureTypeEntries.push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: type.type,
          persistenceType: PERSISTENCE_TYPES.treasureType,
        } as ReferenceEntry)
      ) as FormGroup
    );
  }

  resetTreasureListForm(table?: ReferenceEntryTable): void {
    this.treasureListForm = buildFormFromObject(
      new ReferenceEntryTable(table)
    ) as FormGroup;
  }
}
