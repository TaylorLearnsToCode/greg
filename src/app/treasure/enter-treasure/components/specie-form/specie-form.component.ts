import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Specie } from '@treasure/enter-treasure/model/treasure-list-entry.model';

@Component({
  selector: 'greg-specie-form',
  templateUrl: './specie-form.component.html',
  styleUrls: ['./specie-form.component.scss'],
})
export class SpecieFormComponent {
  @Input()
  parentForm: FormControl<Specie>;
}
