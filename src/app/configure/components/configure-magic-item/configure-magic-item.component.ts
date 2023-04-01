import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'greg-configure-magic-item',
  templateUrl: './configure-magic-item.component.html',
  styleUrls: ['./configure-magic-item.component.scss'],
})
export class ConfigureMagicItemComponent implements OnInit {
  get diceRolledForm(): FormGroup {
    return this.magicItemForm.get('diceRolled') as FormGroup;
  }
  magicItemForm: FormGroup;
  magicItemList$: Observable<MagicItem[]>;
  get quantityForm(): FormGroup {
    return this.magicItemForm.get('quantity') as FormGroup;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.clearForm();
    this.magicItemList$ = this.dataService.dataState$.pipe(
      map((state) => state.magicItems)
    );
  }

  /** Resets the magic item form to a blank state */
  clearForm(): void {
    this.magicItemForm = buildFormFromObject(new MagicItem()) as FormGroup;
  }

  /** Persists the current item to browser storage */
  saveItem(): void {
    this.dataService.persist(
      DataManagerService.PERSISTENCE_TYPES.magicItem,
      this.magicItemForm.value
    );
  }
}
