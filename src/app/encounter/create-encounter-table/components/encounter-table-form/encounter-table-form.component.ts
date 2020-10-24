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
import { FormArray, FormGroup } from '@angular/forms';
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
  EncounterTableTypes,
  IEncounterTableAction,
} from '../../model/encounter-table.model';
import { Encounter } from '../../model/encounter.model';
import { INDEX_NUMBER_REQUIRED } from '../../utilities/encounter-validation/encounter-validation.util';

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

  /** Iterable element for monster and NPC Saves-As options */
  readonly saveAsClassOptions = Object.keys(SaveAsClass);
  /** Supported types of encounter tables */
  readonly tableTypeOptions = EncounterTableTypes;

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

  /**
   * Adds a new set of dice to be rolled when determining an encounter on this table.
   * @param  {DiceRolled} dieRolled? Defaults to 1D6
   */
  addDieRolled(dieRolled?: DiceRolled): void {
    const dieRolledControl = buildFormFromObject(
      doesExist(dieRolled) ? dieRolled : new DiceRolled(1, 6)
    );
    this.formDiceRolled.push(dieRolledControl);
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

  /** Handler for update action to Dice Rolled for this table. Emits new dice value. */
  updateDiceRolled(): void {
    this.encounterTableAction.emit({
      action: EncounterTableActions.UPDATE_DICE_ROLLED,
      payload: this.formDiceRolled.value,
    } as IEncounterTableAction);
  }

  /** Handler for update action to entire encounter table. Emits current EncounterTable value. */
  updateEncounterTable(): void {
    if (this.formEncounters.length > 0) {
      this.encounterTableAction.emit({
        action: EncounterTableActions.UPDATE_TABLE,
        payload: this.encounterTableForm.value,
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
      if (doesExist(table.encounters) && !isEmpty(table.encounters)) {
        this.encounterTableForm = buildFormFromObject(table) as FormGroup;
      } else {
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
      throw new Error(INDEX_NUMBER_REQUIRED);
    }
    return this.formDiceRolled.length > 0 && idx < this.formDiceRolled.length;
  }
}
