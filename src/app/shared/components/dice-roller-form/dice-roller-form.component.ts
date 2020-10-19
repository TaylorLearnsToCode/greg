import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Presenter component to house re-usable form for when a user is defining
 * a set of dice to be rolled.
 */
@Component({
  selector: 'greg-dice-roller-form',
  templateUrl: './dice-roller-form.component.html',
  styleUrls: ['./dice-roller-form.component.scss'],
})
export class DiceRollerFormComponent {
  /** The form in which the dice are being defined. */
  @Input() parentForm: FormGroup;
  /** If TRUE, breaks the UI such that the no. and pips appear on one line and modifier and multiplier on a second. */
  @Input() splitLines: boolean;
}
