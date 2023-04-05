import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TreasureMap } from '@shared/model/treasure/treasure-map.model';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-configure-treasure-map',
  templateUrl: './configure-treasure-map.component.html',
  styleUrls: ['./configure-treasure-map.component.scss'],
})
export class ConfigureTreasureMapComponent implements OnInit {
  treasureMapForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.treasureMapForm = buildFormFromObject(new TreasureMap()) as FormGroup;
  }
}
