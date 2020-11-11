import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.enum';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.interface';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { areEqual, doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-configure-dice-rolled',
  templateUrl: './configure-dice-rolled.component.html',
  styleUrls: ['./configure-dice-rolled.component.scss'],
})
export class ConfigureDiceRolledComponent implements OnInit, OnChanges {
  @Input() diceRolled: DiceRolled[];
  @Output() createEncounterTableAction = new EventEmitter<
    ICreateEncounterTableAction
  >();

  get diceRolledForm(): FormArray {
    return this.form.get('diceRolled') as FormArray;
  }
  set diceRolledForm(array: FormArray) {
    this.form.setControl('diceRolled', array);
  }
  form: FormGroup = new FormGroup({
    diceRolled: new FormArray([]),
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      doesExist(changes.diceRolled) &&
      !areEqual(
        changes.diceRolled.previousValue,
        changes.diceRolled.currentValue
      )
    ) {
      this.buildDiceRolledFormArray(changes.diceRolled.currentValue);
    }
  }

  addDicePool(idx?: number): void {
    const diceForm = buildFormFromObject(new DiceRolled());
    doesExist(idx)
      ? this.diceRolledForm.insert(idx + 1, diceForm)
      : this.diceRolledForm.push(diceForm);
  }

  clear(): void {
    this.buildDiceRolledFormArray([]);
  }

  removeDicePool(idx: number): void {
    this.diceRolledForm.removeAt(idx);
  }

  save(): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableAction.SAVE_DICE_ROLLED,
      payload: this.diceRolledForm.value.map(
        (die: DiceRolled) => new DiceRolled(die)
      ),
    } as ICreateEncounterTableAction);
  }

  reset(): void {
    this.buildDiceRolledFormArray(this.diceRolled);
  }

  private buildDiceRolledFormArray(diceRolled: DiceRolled[]): void {
    this.diceRolledForm = buildFormFromObject(diceRolled) as FormArray;
  }
}
