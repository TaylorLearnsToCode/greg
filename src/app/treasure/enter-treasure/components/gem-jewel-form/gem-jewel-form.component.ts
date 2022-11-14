import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GemOrJewel } from '@treasure/enter-treasure/model/treasure-list-entry.model';

@Component({
  selector: 'greg-gem-jewel-form',
  templateUrl: './gem-jewel-form.component.html',
  styleUrls: ['./gem-jewel-form.component.scss'],
})
export class GemJewelFormComponent {
  @Input()
  parentForm: FormControl<GemOrJewel>;
}
