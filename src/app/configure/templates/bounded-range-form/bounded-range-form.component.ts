import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { doesExist } from '@shared/utilities/common-util/common.util';

/** Utility template to provide a re-usable form when bounded ranges are necessary */
@Component({
  selector: 'greg-bounded-range-form',
  templateUrl: './bounded-range-form.component.html',
  styleUrls: ['./bounded-range-form.component.scss'],
})
export class BoundedRangeFormComponent {
  @Input() set boundedRangeForm(form: FormGroup) {
    this._boundedRangeForm = form;
  }
  get boundedRangeForm(): FormGroup {
    if (doesExist(this._boundedRangeForm)) {
      return this._boundedRangeForm;
    } else if (doesExist(this.fromParentForm) && doesExist(this.identifier)) {
      return this.fromParentForm.get(this.identifier) as FormGroup;
    } else {
      throw new Error('Unable to determine bounded range input');
    }
  }
  @Input() identifier: string;
  @Input() fromParentForm: FormGroup;

  private _boundedRangeForm: FormGroup;
}
