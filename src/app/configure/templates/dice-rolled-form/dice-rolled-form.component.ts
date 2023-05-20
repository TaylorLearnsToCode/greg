import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';

/**
 * Form template to leverage with DiceRolled dice pool elements.
 *
 * Either diceRolledForm is required or <i>both</i> fromParentForm
 * and identifier are required. In the presence of all, diceRolled
 * takes precedence.
 */
@Component({
  selector: 'greg-dice-rolled-form',
  templateUrl: './dice-rolled-form.component.html',
  styleUrls: ['./dice-rolled-form.component.scss'],
})
export class DiceRolledFormComponent {
  /** The dice pool to be defined by this form */
  @Input() set diceRolledForm(formGroup: FormGroup) {
    this._diceRolledForm = formGroup;
  }
  get diceRolledForm(): FormGroup {
    if (doesExist(this._diceRolledForm)) {
      return this._diceRolledForm;
    } else if (doesExist(this.fromParentForm) && doesExist(this.identifier)) {
      return this.fromParentForm.get(this.identifier) as FormGroup;
    } else {
      throwError('Unable to determine dice rolling input property.');
      return new FormGroup({});
    }
  }
  /**
   * The parent form in which the dice pool to be rolled resides.
   * Useful for FormArray.
   */
  @Input() fromParentForm: FormGroup;
  /**
   * The identifier of the control name in the parent form in which the dice
   * pool to be rolled resides. Useful for FormArray.
   */
  @Input() identifier: string;
  /** Whether or not the modifier/multiplier should appear on a second line in the display. */
  @Input() splitLines: boolean;

  private _diceRolledForm: FormGroup;
}
