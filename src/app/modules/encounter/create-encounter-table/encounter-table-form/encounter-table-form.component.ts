import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { SaveAsClass } from '@shared/model/save-as.model';
import {
  areEqual,
  doesExist,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { getRollRange } from '@shared/utilities/dice-roller/dice-roller.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../model/encounter-table.model';
import { Encounter } from '../model/encounter.model';

@Component({
  selector: 'greg-encounter-table-form',
  templateUrl: './encounter-table-form.component.html',
  styleUrls: ['./encounter-table-form.component.scss'],
})
export class EncounterTableFormComponent implements OnInit, OnChanges {
  @Input() encounterTable: EncounterTable;
  @Output() encounterTableAction = new EventEmitter<IEncounterTableAction>();

  encounterTableForm: FormGroup = buildFormFromObject(
    new EncounterTable()
  ) as FormGroup;
  get formDiceRolled(): FormArray {
    return this.encounterTableForm.get('diceRolled') as FormArray;
  }
  get formEncounters(): FormArray {
    return this.encounterTableForm.get('encounters') as FormArray;
  }
  isDungeonEncounter: boolean;
  saveAsClassOptions = Object.keys(SaveAsClass);

  constructor() {}

  ngOnInit(): void {
    this.isDungeonEncounter = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.encounterTable) {
      this.updateEncounterFormValues(changes.encounterTable);
      this.rebuildEncounterTable(changes.encounterTable.currentValue);
    }
    console.log(this.encounterTableForm);
  }

  addDieRolled(): void {
    this.formDiceRolled.push(buildFormFromObject(new DiceRolled(1, 6)));
  }

  addEncounter(idx?: number): void {
    idx = doesExist(idx) ? idx : -1;
    const newEncounter: AbstractControl = buildFormFromObject(
      new Encounter(0, 0, [new Monster()])
    );
    if (idx >= 0) {
      this.formEncounters.insert(idx + 1, newEncounter);
    } else {
      this.formEncounters.push(newEncounter);
    }
  }

  addMonster(encounterIndex: number, monsterIndex: number): void {
    (this.formEncounters.controls[encounterIndex].get(
      'monsters'
    ) as FormArray).insert(monsterIndex, buildFormFromObject(new Monster()));
  }

  clearDiceRolled(): void {
    while (this.formDiceRolled.length > 0) {
      this.formDiceRolled.removeAt(0);
    }
  }

  clearTableForm(): void {
    const resultTable: FormArray = this.formEncounters;
    while (resultTable.controls.length > 0) {
      resultTable.removeAt(0);
    }
  }

  removeDieRolled(idx: number): void {
    if (this.validateDieRemove(idx)) {
      this.formDiceRolled.removeAt(idx);
    }
  }

  removeEncounter(idx: number): void {
    if (this.validateEncounterRemove(idx)) {
      this.formEncounters.removeAt(idx);
    }
  }

  removeMonster(encounterIndex: number, monsterIndex: number): void {
    (this.formEncounters.controls[encounterIndex].get(
      'monsters'
    ) as FormArray).removeAt(monsterIndex);
  }

  updateDiceRolled(): void {
    this.encounterTableAction.emit({
      action: EncounterTableActions.UPDATE_DICE_ROLLED,
      payload: this.formDiceRolled.value,
    } as IEncounterTableAction);
  }

  updateEncounters(): void {
    if (this.formEncounters.length > 0) {
      this.encounterTableAction.emit({
        action: EncounterTableActions.UPDATE_ENCOUNTERS,
        payload: this.formEncounters.value,
      } as IEncounterTableAction);
    }
  }

  private rebuildEncounterTable(table: EncounterTable): void {
    const currentEncounters: FormArray = this.formEncounters;
    if (isEmpty(currentEncounters.controls) && !isEmpty(table.diceRolled)) {
      const resultRange: number[] = getRollRange(table.diceRolled);
      resultRange.forEach((roll: number) =>
        currentEncounters.push(
          buildFormFromObject(new Encounter(roll, null, [new Monster()]))
        )
      );
    }
  }

  private updateEncounterFormValues(tableDelta: SimpleChange): void {
    if (!areEqual(tableDelta.currentValue, tableDelta.previousValue)) {
      this.encounterTableForm.patchValue(tableDelta.currentValue);
    }
  }

  private validateDieRemove(idx: number): boolean {
    if (!doesExist(idx)) {
      throw new Error('Index Number is Required');
    }
    return this.formDiceRolled.length > 0 && idx < this.formDiceRolled.length;
  }

  private validateEncounterRemove(idx: number): boolean {
    if (!doesExist(idx)) {
      throw new Error('Index Number is Required');
    }
    return this.formEncounters.length > 0 && idx < this.formEncounters.length;
  }
}
