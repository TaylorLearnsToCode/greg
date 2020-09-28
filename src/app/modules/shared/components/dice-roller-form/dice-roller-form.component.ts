import { Component, Input, OnInit } from '@angular/core';
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
export class DiceRollerFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
