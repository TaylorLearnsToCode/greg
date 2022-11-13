import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'greg-bounded-range-form',
  templateUrl: './bounded-range-form.component.html',
  styleUrls: ['./bounded-range-form.component.scss'],
})
export class BoundedRangeFormComponent {
  /** The form control in which the range is being entered */
  @Input()
  parentForm: UntypedFormGroup;
}
