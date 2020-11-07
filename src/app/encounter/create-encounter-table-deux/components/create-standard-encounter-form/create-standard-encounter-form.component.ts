import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table-deux/model/create-encounter-table-action.interface';
import { CreateEncounterTableActions } from '@encounter/create-encounter-table-deux/model/create-encounter-table-actions.enum';
import { EncounterResultMapping } from '@encounter/create-encounter-table-deux/model/encounter-result-mapping.model';
import { Encounter } from '@encounter/create-encounter-table-deux/model/encounter.model';
import { IUpsertEncounterDTO } from '@encounter/create-encounter-table-deux/model/upsert-encounter-dto.interface';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist, isEmpty } from '@shared/utilities/common-util/common.util';
import { getBoundedRange } from '@shared/utilities/dice-roller/dice-roller.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-create-standard-encounter-form',
  templateUrl: './create-standard-encounter-form.component.html',
  styleUrls: ['./create-standard-encounter-form.component.scss'],
})
export class CreateStandardEncounterFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() createEncounterTableAction = new EventEmitter<
    ICreateEncounterTableAction
  >();

  get resultMappingForm(): FormArray {
    return this.parentForm.get('resultMapping') as FormArray;
  }
  get encountersForm(): FormArray {
    return this.parentForm.get('encounters') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  addEncounter(idx?: number): void {
    const newEncounter = buildFormFromObject(new Encounter());
    const newMapping = buildFormFromObject(
      new EncounterResultMapping({
        encounterIndex: doesExist(idx) ? idx + 1 : this.encountersForm.length,
        low: doesExist(idx) ? idx + 2 : this.resultMappingForm.length + 1,
      } as EncounterResultMapping)
    );
    if (doesExist(idx)) {
      this.resultMappingForm.insert(idx + 1, newMapping);
      this.encountersForm.insert(idx + 1, newEncounter);
    } else {
      this.resultMappingForm.push(newMapping);
      this.encountersForm.push(newEncounter);
    }
  }

  buildFormTable(): void {
    this.rebuildResultMappingForm();
    this.backfillEncounters();
    this.reIndexResultMappingForm();
  }

  editEncounter(idx: number): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableActions.UPSERT_ENCOUNTER,
      payload: {
        index: idx,
        encounter: new Encounter(this.encountersForm.controls[idx].value),
      } as IUpsertEncounterDTO,
    } as ICreateEncounterTableAction);
  }

  removeEncounter(idx: number): void {
    if (doesExist(idx)) {
      this.encountersForm.removeAt(idx);
      this.resultMappingForm.removeAt(idx);
      this.reIndexResultMappingForm();
    } else {
      throw Error('Index is required when removing encounters');
    }
  }

  private backfillEncounters(): void {
    let diff = this.resultMappingForm.length - this.encountersForm.length;
    while (diff > 0) {
      this.encountersForm.push(buildFormFromObject(new Encounter()));
      diff--;
    }
    while (diff < 0) {
      this.resultMappingForm.push(
        buildFormFromObject(new EncounterResultMapping())
      );
      diff++;
    }
  }

  private rebuildResultMappingForm(): void {
    const diceRolled: DiceRolled[] = this.parentForm.get('diceRolled').value;
    if (doesExist(diceRolled) && !isEmpty(diceRolled)) {
      this.resultMappingForm.clear();
      const diceRange: number[] = getBoundedRange(...diceRolled);
      let mapping: EncounterResultMapping;
      for (let i = diceRange[0]; i <= diceRange[1]; i++) {
        mapping = new EncounterResultMapping({
          low: i,
        } as EncounterResultMapping);
        this.resultMappingForm.push(buildFormFromObject(mapping));
      }
    } else {
      throw Error('Dice Rolled must be defined before building form table');
    }
  }

  private reIndexResultMappingForm(): void {
    this.resultMappingForm.controls.forEach(
      (control: FormGroup, index: number) =>
        control.get('encounterIndex').patchValue(index)
    );
  }
}
