import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
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
  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

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

  /** Exports current form magic item to a file on the user's local machine */
  exportMagicItem(): void {
    this.dataService.exportObject(
      this.magicItemForm.value,
      this.magicItemForm.value.name,
      this.PERSISTENCE_TYPES.magicItem.toUpperCase()
    );
  }

  /** Click handler for Import action */
  importMagicItem(): void {
    alert('Implement this next!');
  }

  /** Imports a specified magic item file into the form */
  onImportMagicItem(): void {}

  /** Persists the current item to browser storage */
  saveItem(): void {
    this.dataService.persist(
      PERSISTENCE_TYPES.magicItem,
      this.magicItemForm.value
    );
  }
}
