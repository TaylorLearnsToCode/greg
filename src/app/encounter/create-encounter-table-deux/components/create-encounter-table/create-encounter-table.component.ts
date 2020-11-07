import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table-deux/model/create-encounter-table-action.interface';
import { CreateEncounterTableActions } from '@encounter/create-encounter-table-deux/model/create-encounter-table-actions.enum';
import { ICreateEncounterTableViewState } from '@encounter/create-encounter-table-deux/model/create-encounter-view-state.interface';
import { EncounterTableTypes } from '@encounter/create-encounter-table-deux/model/encounter-table-types.enum';
import { EncounterTable } from '@encounter/create-encounter-table-deux/model/encounter-table.model';
import { CreateEncounterTableFacade } from '@encounter/create-encounter-table-deux/services/create-encounter-table-facade/create-encounter-table.facade';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable } from 'rxjs';
import { CreateStandardEncounterFormComponent } from '../create-standard-encounter-form/create-standard-encounter-form.component';

@Component({
  selector: 'greg-create-encounter-table',
  templateUrl: './create-encounter-table.component.html',
  styleUrls: ['./create-encounter-table.component.scss'],
})
export class CreateEncounterTableComponent implements OnInit {
  @ViewChild('createStandard')
  createStandardEncounterForm: CreateStandardEncounterFormComponent;
  @ViewChild('importTableInput') importTableInputRef: ElementRef<
    HTMLInputElement
  >;

  readonly ENCOUNTER_TABLE_TYPES = EncounterTableTypes;
  readonly ENCOUNTER_TABLE_ACTIONS = CreateEncounterTableActions;

  encounterTableForm: FormGroup;
  get tableType(): EncounterTableTypes {
    return this.encounterTableForm.get('type').value as EncounterTableTypes;
  }
  viewState$: Observable<ICreateEncounterTableViewState>;

  private get importTableInput(): HTMLInputElement {
    return this.importTableInputRef.nativeElement;
  }

  constructor(private facade: CreateEncounterTableFacade) {}

  ngOnInit(): void {
    this.viewState$ = this.facade.initialize();
    this.encounterTableForm = buildFormFromObject(
      new EncounterTable()
    ) as FormGroup;
  }

  clearEncounters(): void {
    (this.encounterTableForm.get('resultMapping') as FormArray).clear();
    (this.encounterTableForm.get('encounters') as FormArray).clear();
  }

  export(): void {
    this.facade.handleCreateEncounterTableAction({
      action: CreateEncounterTableActions.EXPORT_TABLE,
      payload: new EncounterTable(this.encounterTableForm.value),
    } as ICreateEncounterTableAction);
  }

  import(): void {
    this.importTableInput.click();
  }

  onCreateEncounterTableAction(event: ICreateEncounterTableAction): void {
    this.facade.handleCreateEncounterTableAction(event);
  }

  onImportSelected(): void {
    const rawFile: File = this.importTableInput.files.item(0);
    if (doesExist(rawFile)) {
      rawFile.text().then((value: string) => {
        const table = new EncounterTable(JSON.parse(value));
        this.encounterTableForm = buildFormFromObject(table) as FormGroup;
      });
    }
  }

  rebuildEncounters(): void {
    this.clearEncounters();
    if (this.tableType === EncounterTableTypes.STANDARD) {
      this.createStandardEncounterForm.buildFormTable();
    } else {
      alert('nested');
    }
  }
}
