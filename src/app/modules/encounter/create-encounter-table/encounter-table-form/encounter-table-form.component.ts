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

/** UI element for user to define and populate a wandering monster / random encounter table. */
@Component({
  selector: 'greg-encounter-table-form',
  templateUrl: './encounter-table-form.component.html',
  styleUrls: ['./encounter-table-form.component.scss'],
})
export class EncounterTableFormComponent implements OnInit, OnChanges {
  /** Table of Encounters to be Modified. */
  @Input() encounterTable: EncounterTable;
  /** Event delegator: EncounterTableActions to parent. */
  @Output() encounterTableAction = new EventEmitter<IEncounterTableAction>();

  /** Mutable form element created fresh or from input {encounterTable}. */
  encounterTableForm: FormGroup = buildFormFromObject(
    new EncounterTable()
  ) as FormGroup;
  /** Read only accessor for mutable form object representing dice to be rolled on this table. */
  get formDiceRolled(): FormArray {
    return this.encounterTableForm.get('diceRolled') as FormArray;
  }
  /** Read only accessor for mutable form object representing the editable encounter grid. */
  get formEncounters(): FormArray {
    return this.encounterTableForm.get('encounters') as FormArray;
  }
  /** Whether this table is intended to be rolled in a Dungeon (TRUE) or in the Wilderness (FALSE) */
  isDungeonEncounter: boolean;
  /** Iterable element for monster and NPC Saves-As options */
  saveAsClassOptions = Object.keys(SaveAsClass);

  /** Exception message for missing index */
  private INDEX_NUMBER_REQUIRED = 'Index Number is Required';

  /** Initialization method. */
  ngOnInit(): void {
    this.isDungeonEncounter = false;
  }

  /**
   * OnChanges life cycle method. If an update to the encounter table is detected, attempts
   * to update the encounter table form with the new values and adds new rows to the table if
   * the dice to be rolled don't match up to the rows in the table.
   * @param  {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildEncounterTable(changes.encounterTable.currentValue);
    this.updateEncounterFormValues(changes.encounterTable);
  }

  /** Adds a new set of dice to be rolled when determining an encounter on this table. */
  addDieRolled(): void {
    this.formDiceRolled.push(buildFormFromObject(new DiceRolled(1, 6)));
  }

  /**
   * Adds a new encounter to the encounter table after a specified index, {idx}. If no index
   * is specified, inserts the new encounter at the end of the list.
   * @param  {number} idx?
   */
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

  /**
   * Adds a new monster to a monster grouping. The encounter to which the monster will be
   * added is at index {encounterIndex}; the monster after {monsterIndex}.
   * @param  {number} encounterIndex
   * @param  {number} monsterIndex
   */
  addMonster(encounterIndex: number, monsterIndex: number): void {
    (this.formEncounters.controls[encounterIndex].get(
      'monsters'
    ) as FormArray).insert(
      monsterIndex + 1,
      buildFormFromObject(new Monster())
    );
  }

  /** Removes all dice to be rolled for this encounter table. */
  clearDiceRolled(): void {
    while (this.formDiceRolled.length > 0) {
      this.formDiceRolled.removeAt(0);
    }
  }

  /** Removes all encounters from the encounter table. */
  clearTableForm(): void {
    const resultTable: FormArray = this.formEncounters;
    while (resultTable.controls.length > 0) {
      resultTable.removeAt(0);
    }
  }

  /**
   * Removes the group of dice to be rolled at target index {idx}, provided {idx} is a
   * valid target. If no index is provided, throws an error.
   * @param  {number} idx
   * @throws INDEX_NUMBER_REQUIRED
   */
  removeDieRolled(idx: number): void {
    if (this.validateDieRemove(idx)) {
      this.formDiceRolled.removeAt(idx);
    }
  }

  /**
   * Removes the encounter at the target index {idx} from the encounter table,
   * provided {idx} is a valid target. If no index is provided, throws an error.
   * @param  {number} idx
   * @throws INDEX_NUMBER_REQUIRED
   */
  removeEncounter(idx: number): void {
    if (this.validateEncounterRemove(idx)) {
      this.formEncounters.removeAt(idx);
    }
  }

  /**
   * Removes a monster at index {monster} from the encounter at index {encounterIndex}.
   * @param  {number} encounterIndex
   * @param  {number} monsterIndex
   */
  removeMonster(encounterIndex: number, monsterIndex: number): void {
    const targetEncounter = this.formEncounters.controls[encounterIndex].get(
      'monsters'
    ) as FormArray;
    if (targetEncounter.length > 1) {
      targetEncounter.removeAt(monsterIndex);
    }
  }

  /** Handler for update action to Dice Rolled for this table. Emits new dice value. */
  updateDiceRolled(): void {
    this.encounterTableAction.emit({
      action: EncounterTableActions.UPDATE_DICE_ROLLED,
      payload: this.formDiceRolled.value,
    } as IEncounterTableAction);
  }

  /** Handler for update action to encounter array for this table. Emits new encounter array. */
  updateEncounters(): void {
    if (this.formEncounters.length > 0) {
      this.encounterTableAction.emit({
        action: EncounterTableActions.UPDATE_ENCOUNTERS,
        payload: this.formEncounters.value,
      } as IEncounterTableAction);
    }
  }

  /**
   * If the encounter table is currently empty, adds rows to the encounter table form
   * sufficient to house all elements in a provided encounter table object.
   * @param  {EncounterTable} table
   */
  private rebuildEncounterTable(table: EncounterTable): void {
    if (doesExist(table)) {
      const currentEncounters: FormArray = this.formEncounters;
      if (isEmpty(currentEncounters.controls) && !isEmpty(table.diceRolled)) {
        const resultRange: number[] = getRollRange(...table.diceRolled);
        resultRange.forEach((roll: number) =>
          currentEncounters.push(
            buildFormFromObject(new Encounter(roll, null, [new Monster()]))
          )
        );
      }
    }
  }

  /**
   * Having been fed the changes for an Encounter Table input, if the new value represents
   * a change from the old value, updates the encounter table form with the new value.
   * @param  {SimpleChange} tableDelta
   */
  private updateEncounterFormValues(tableDelta: SimpleChange): void {
    if (!areEqual(tableDelta.currentValue, tableDelta.previousValue)) {
      this.encounterTableForm.patchValue(tableDelta.currentValue);
    }
  }

  /**
   * Returns TRUE if there are dice to remove from the dice roll frorm and the provided
   * index is a valid entry to be removed. If no index is provided, throws an error.
   * @param  {number} idx
   * @throws INDEX_NUMBER_REQUIRED
   */
  private validateDieRemove(idx: number): boolean {
    if (!doesExist(idx)) {
      throw new Error(this.INDEX_NUMBER_REQUIRED);
    }
    return this.formDiceRolled.length > 0 && idx < this.formDiceRolled.length;
  }

  /**
   * Returns TRUE if there are encounters to remove from the encounter form and the
   * provided index is a valid entry to be removed. If no index is provided, throws
   * an error.
   * @param  {number} idx
   * @throws INDEX_NUMBER_REQUIRED
   */
  private validateEncounterRemove(idx: number): boolean {
    if (!doesExist(idx)) {
      throw new Error(this.INDEX_NUMBER_REQUIRED);
    }
    return this.formEncounters.length > 0 && idx < this.formEncounters.length;
  }
}
