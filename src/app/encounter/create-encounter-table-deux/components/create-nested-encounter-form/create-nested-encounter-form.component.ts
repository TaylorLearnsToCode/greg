import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table-deux/model/create-encounter-table-action.interface';
import { CreateEncounterTableActions } from '@encounter/create-encounter-table-deux/model/create-encounter-table-actions.enum';
import { EncounterResultMapping } from '@encounter/create-encounter-table-deux/model/encounter-result-mapping.model';
import { EncounterTable } from '@encounter/create-encounter-table-deux/model/encounter-table.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist, isEmpty } from '@shared/utilities/common-util/common.util';
import { getBoundedRange } from '@shared/utilities/dice-roller/dice-roller.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-create-nested-encounter-form',
  templateUrl: './create-nested-encounter-form.component.html',
  styleUrls: ['./create-nested-encounter-form.component.scss'],
})
export class CreateNestedEncounterFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() createEncountereTableAction = new EventEmitter<
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

  addSubtable(idx?: number): void {
    const newTable = buildFormFromObject(new EncounterTable());
    const newMapping = buildFormFromObject(
      new EncounterResultMapping({
        encounterIndex: doesExist(idx) ? idx + 1 : this.encountersForm.length,
        low: doesExist(idx) ? idx + 2 : this.resultMappingForm.length + 1,
      } as EncounterResultMapping)
    );
    if (doesExist(idx)) {
      this.resultMappingForm.insert(idx + 1, newMapping);
      this.encountersForm.insert(idx + 1, newTable);
    } else {
      this.resultMappingForm.push(newMapping);
      this.encountersForm.push(newTable);
    }
  }

  buildFormTable(): void {
    this.rebuildResultMappingForm();
    this.backfillSubtables();
    this.reIndexResultMappingForm();
  }

  editSubtable(idx: number): void {
    this.createEncountereTableAction.emit({
      action: CreateEncounterTableActions.UPSERT_SUBTABLE,
      payload: idx,
    } as ICreateEncounterTableAction);
  }

  removeSubtable(idx: number): void {
    if (doesExist(idx)) {
      this.encountersForm.removeAt(idx);
    } else {
      throw Error('Index is required when removing an Encounter Table entry');
    }
  }

  private backfillSubtables(): void {
    let dice: DiceRolled;
    let diff = this.resultMappingForm.length - this.encountersForm.length;
    while (diff > 0) {
      dice = this.parentForm.get('diceRolled').value[1];
      this.encountersForm.push(
        buildFormFromObject(
          new EncounterTable({
            diceRolled: doesExist(dice)
              ? [
                  new DiceRolled(
                    dice.no,
                    dice.pips,
                    dice.modifier,
                    dice.multiplier
                  ),
                ]
              : [],
          } as EncounterTable)
        )
      );
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
      const diceRange: number[] = getBoundedRange(diceRolled[0]);
      let mapping: EncounterResultMapping;
      for (let i = diceRange[0]; i <= diceRange[1]; i++) {
        mapping = new EncounterResultMapping({
          low: i,
        } as EncounterResultMapping);
        this.resultMappingForm.push(buildFormFromObject(mapping));
      }
    } else {
      throw Error('Dice Rolled must be defined before buildin form table');
    }
  }

  private reIndexResultMappingForm(): void {
    this.resultMappingForm.controls.forEach(
      (control: FormGroup, index: number) => {
        control.get('encounterIndex').patchValue(index);
      }
    );
  }
}
