import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { MagicItemTableEntry } from '@treasure/treasure-common/model/magic-item.model';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';

@Component({
  selector: 'greg-magic-item-entry-form',
  templateUrl: './magic-item-entry-form.component.html',
  styleUrls: ['./magic-item-entry-form.component.scss'],
})
export class MagicItemEntryFormComponent implements OnInit {
  magicItemEntryForm: FormGroup;

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {
    this.initializeMagicItemEntryForm();
  }

  addItem(): void {
    this.controllerService.addTableEntry(this.magicItemEntryForm.value);
    this.initializeMagicItemEntryForm();
  }

  private initializeMagicItemEntryForm(): void {
    this.magicItemEntryForm = buildFormFromObject(
      new MagicItemTableEntry()
    ) as FormGroup;
  }
}
