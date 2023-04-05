import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// TODO: rename to indicate it's a form
@Component({
  selector: 'greg-rollable-table-template',
  templateUrl: './rollable-table-template.component.html',
  styleUrls: ['./rollable-table-template.component.scss'],
})
export class RollableTableTemplateComponent {
  @Input() tableForm: FormGroup;
}
