import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Weapon } from '@shared/model/weapon.model';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

/** UI element to encapsulate data entry for weapons and attacks for monsters. */
@Component({
  selector: 'greg-monster-attacks-form',
  templateUrl: './monster-attacks-form.component.html',
  styleUrls: ['./monster-attacks-form.component.scss'],
})
export class MonsterAttacksFormComponent {
  /** Parent FormGroup - should be created from Monster object */
  @Input() monsterFormGroup: FormGroup;

  /** Accessor for the "attacks" array within the Monster FormGroup */
  get monsterAttacks(): FormArray {
    return this.monsterFormGroup.get('attacks') as FormArray;
  }

  /**
   * Adds a new attack for the monster immediately after the attack the provided index.
   * @param  {number} index
   */
  addMonsterAttack(index: number): void {
    this.monsterAttacks.insert(index + 1, buildFormFromObject(new Weapon()));
  }

  /**
   * Removes (deletes) the attack from the monster at the provided index.
   * Will not delete the last attack a monster has.
   * @param  {number} index
   */
  removeMonsterAttack(index: number): void {
    if (this.monsterAttacks.controls.length > 1) {
      this.monsterAttacks.removeAt(index);
    }
  }
}
