import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('magicItemImport') magicItemImportRef: ElementRef;

  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  readonly MAGIC_ITEM = PERSISTENCE_TYPES.magicItem.toUpperCase();

  get diceRolledForm(): FormGroup {
    return this.magicItemForm.get('diceRolled') as FormGroup;
  }
  get magicItemImport(): HTMLInputElement {
    return this.magicItemImportRef.nativeElement as HTMLInputElement;
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
    this.magicItemImport.click();
  }

  /** Imports a specified magic item file into the form */
  onMagicItemImport(): void {
    if (this.magicItemImport.files?.length) {
      (
        this.dataService.import<MagicItem>(
          this.magicItemImport.files[0]
        ) as Observable<MagicItem>
      ).subscribe((item) => {
        this.magicItemForm = buildFormFromObject(
          new MagicItem(item)
        ) as FormGroup;
      });
      this.magicItemImport.value = '';
    } else {
      throw new Error('No magic item type import file found.');
    }
  }

  /** Persists the current item to browser storage */
  saveItem(): void {
    this.dataService.persist(
      PERSISTENCE_TYPES.magicItem,
      this.magicItemForm.value
    );
  }
}
