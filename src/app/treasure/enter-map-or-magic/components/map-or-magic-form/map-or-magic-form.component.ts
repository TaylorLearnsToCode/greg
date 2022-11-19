import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';
import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';

@Component({
  selector: 'greg-map-or-magic-form',
  templateUrl: './map-or-magic-form.component.html',
  styleUrls: ['./map-or-magic-form.component.scss'],
})
export class MapOrMagicFormComponent implements OnInit {
  mapOrMagicEntryForm: UntypedFormGroup;

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {
    this.initializeMapOrMagicEntryForm();
  }

  addToList(): void {
    this.controllerService.addToList(this.mapOrMagicEntryForm.value);
    this.initializeMapOrMagicEntryForm();
  }

  private initializeMapOrMagicEntryForm(): void {
    this.mapOrMagicEntryForm = buildFormFromObject(
      new MagicItem()
    ) as FormGroup;
  }
}
