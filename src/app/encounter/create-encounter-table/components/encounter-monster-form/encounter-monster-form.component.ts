import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Monster } from '@shared/model/monster.model';
import { SaveAsClass } from '@shared/model/save-as.model';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

/** UI element to house form element for users to enter monster data into for use with encounter tables. */
@Component({
  selector: 'greg-encounter-monster-form',
  templateUrl: './encounter-monster-form.component.html',
  styleUrls: ['./encounter-monster-form.component.scss'],
})
export class EncounterMonsterFormComponent {
  /** The parent encounter form on which the monsters being edited are rolled. */
  @Input() encounterFormGroup: FormGroup;
  /** Whether this encounter takes place in a dungeon (TRUE) or the wilderness (FALSE, undefined) */
  @Input() isDungeonEncounter: boolean;

  readonly saveAsClassOptions = Object.keys(SaveAsClass);

  /** Accessor for the FormArray of monsters in the provided encounterFormGroup. */
  get monstersForm(): FormArray {
    return this.encounterFormGroup.get('monsters') as FormArray;
  }

  /**
   * Adds a new monster to a monster grouping. The encounter to which the monster will be
   * added is at index {encounterIndex}; the monster after {monsterIndex}.
   * @param  {number} monsterIndex
   */
  addMonster(monsterIndex: number): void {
    this.monstersForm.insert(
      monsterIndex + 1,
      buildFormFromObject(new Monster())
    );
  }

  /**
   * Removes a monster at index {monster} from the encounter at index {encounterIndex}.
   * @param  {number} monsterIndex
   */
  removeMonster(monsterIndex: number): void {
    if (this.monstersForm.controls.length > 1) {
      this.monstersForm.removeAt(monsterIndex);
    }
  }
}
