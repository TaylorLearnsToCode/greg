import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MagicItem } from '@treasure/enter-treasure/model/magic-item.model';

@Component({
  selector: 'greg-magic-item-form',
  templateUrl: './magic-item-form.component.html',
  styleUrls: ['./magic-item-form.component.scss'],
})
export class MagicItemFormComponent {
  @Input()
  parentForm: FormControl<MagicItem>;
}
