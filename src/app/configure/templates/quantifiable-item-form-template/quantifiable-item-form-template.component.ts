import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractQuantifiableItem } from '@shared/model/framework/abstract-quantifiable-item.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-quantifiable-item-form-template',
  templateUrl: './quantifiable-item-form-template.component.html',
  styleUrls: ['./quantifiable-item-form-template.component.scss'],
})
export class QuantifiableItemFormTemplateComponent implements OnInit {
  @Input() set itemIdentifiers(identifiers: string) {
    this._itemIdentifiers = identifiers;
  }
  get itemIdentifiers(): string {
    return doesExist(this._itemIdentifiers) ? this._itemIdentifiers : 'name';
  }
  @Input() itemForm: FormGroup;
  @Input() persistenceType: string;
  @Input() set quantityLabel(label: string) {
    this._quantityLabel = label;
  }
  get quantityLabel(): string {
    return doesExist(this._quantityLabel) ? this._quantityLabel : 'Quantity';
  }

  @Output() editSavedItemEvent = new EventEmitter();

  @ViewChild('savedItemsImportInput') savedItemsImportInputRef: ElementRef;

  savedItem$: Observable<AbstractQuantifiableItem[]>;
  get quantityForm(): FormGroup {
    return this.itemForm.get('quantity') as FormGroup;
  }

  private _itemIdentifiers: string;
  private _quantityLabel: string;
  private get savedItemsImportInput(): HTMLInputElement {
    return this.savedItemsImportInputRef.nativeElement as HTMLInputElement;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.savedItem$ = this.dataService.dataState$.pipe(
      map((state) => state.monsterTypes)
    );
  }

  /** Resets the parent item form via the edit handler */
  clearItemForm(): void {
    this.editSavedItem({} as AbstractQuantifiableItem);
  }

  /** Removes all configured items from local storage */
  clearSavedItems(): void {
    this.dataService.clear(this.persistenceType);
  }

  /**
   * Emits the target item upwards, nominating it for edit to the parent component
   *
   * @param  {AbstractQuantifiableItem} item
   */
  editSavedItem(item: AbstractQuantifiableItem): void {
    this.editSavedItemEvent.emit(item);
  }

  /** Exports current items stored in local storage */
  exportSavedItems(items: AbstractQuantifiableItem[]): void {
    this.dataService.exportObject(
      items,
      this.persistenceType + 's',
      this.persistenceType.toUpperCase()
    );
  }

  /** Imports a list of saved entries of the configured type into local storage */
  importSavedItems(): void {
    this.savedItemsImportInput.click();
  }

  /** Handler for import event */
  onSavedItemImport(): void {
    if (this.savedItemsImportInput.files) {
      this.dataService.import(
        this.savedItemsImportInput.files[0],
        this.persistenceType
      );
      this.savedItemsImportInput.value = '';
    }
  }

  /** Persists the current form item into browser storage */
  saveItem() {
    this.dataService.persist(this.persistenceType, this.itemForm.value);
    this.clearItemForm();
  }

  /**
   * Removes the saved item at the target index from browser storage
   *
   * @param  {AbstractQuantifiableItem} item
   */
  removeEntry(item: AbstractQuantifiableItem): void {
    this.dataService.delete(item, this.persistenceType, this.itemIdentifiers);
  }

  /**
   * Moves the saved entry at a target index one step in the indicated direction
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftEntry(index: number, direction: string): void {
    this.dataService.shiftListEntry(this.persistenceType, index, direction);
  }
}
