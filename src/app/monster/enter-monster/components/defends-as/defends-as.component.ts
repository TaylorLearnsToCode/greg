import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { troopTypes } from '@shared/model/troop-types.enum';
import { ManEquivalence } from '@shared/model/www-monster.model';

@Component({
  selector: 'greg-defends-as',
  templateUrl: './defends-as.component.html',
  styleUrls: ['./defends-as.component.scss'],
})
export class DefendsAsComponent {
  /** Local troop type enum for UI iteration */
  readonly TROOP_TYPES = Object.keys(troopTypes);

  /** The form control from the parent form element */
  @Input()
  parentForm: FormControl<ManEquivalence>;
}
