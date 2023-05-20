import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { AbstractQuantifiableItem } from '@shared/model/framework/abstract-quantifiable-item.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { AppComponentManagerService } from '@shared/services/app-component-manager/app-component-manager.service';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import {
  doesExist,
  sortByField,
} from '@shared/utilities/common-util/common.util';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'greg-quantifiable-item-form-template',
  templateUrl: './quantifiable-item-form-template.component.html',
  styleUrls: ['./quantifiable-item-form-template.component.scss'],
})
export class QuantifiableItemFormTemplateComponent
  implements OnDestroy, OnInit
{
  @Input() set itemIdentifiers(identifiers: string) {
    this._itemIdentifiers = identifiers;
  }
  get itemIdentifiers(): string {
    return ''.concat(
      'system',
      doesExist(this._itemIdentifiers) ? `,${this._itemIdentifiers}` : ',name'
    );
  }
  @Input() includeSupplementalList: boolean;
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

  listContainerStyles: object = {};
  savedItem$: Observable<AbstractQuantifiableItem[]>;
  selectedSystem: SUPPORTED_SYSTEMS;
  get supportedSystemKeys(): string[] {
    return Object.keys(this.SUPPORTED_SYSTEMS);
  }
  supportedSystem(key: string): string {
    return (this.SUPPORTED_SYSTEMS as any)[key];
  }
  get quantityForm(): FormGroup {
    return this.itemForm.get('quantity') as FormGroup;
  }

  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  private _itemIdentifiers: string;
  private _quantityLabel: string;
  private destroySource: Subject<void> = new Subject();
  private get savedItemsImportInput(): HTMLInputElement {
    return this.savedItemsImportInputRef.nativeElement as HTMLInputElement;
  }

  constructor(
    private appManagerService: AppComponentManagerService,
    private dataService: DataManagerService
  ) {}

  ngOnInit(): void {
    this.savedItem$ = this.dataService.dataState$.pipe(
      map((state) => this.sortMonsterTypes(state.monsterTypes))
    );
    this.selectedSystem = '' as SUPPORTED_SYSTEMS;
    this.subscribeListContainerStyles();
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  /** Resets the parent item form via the edit handler */
  clearItemForm(): void {
    this.editSavedItem({
      system: this.selectedSystem,
    } as AbstractQuantifiableItem);
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

  /** When the default system is changed from the UI, update the item form */
  onDefaultSystemSelect(event: any): void {
    this.selectedSystem = event.target.value;
    this.itemForm.get('system')?.setValue(this.selectedSystem);
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

  private sortMonsterTypes(monsterList: MonsterType[]): MonsterType[] {
    const nextList: MonsterType[] = monsterList.map((m) => new MonsterType(m));
    sortByField(nextList);
    return nextList;
  }

  private subscribeListContainerStyles(): void {
    this.appManagerService.appComponentViewState$
      .pipe(
        tap((state) => {
          if (this.includeSupplementalList) {
            const maxHeight: string = (state.mainStyles as any)['max-height'];
            (this.listContainerStyles as any)[
              'max-height'
            ] = `calc(${maxHeight} * .4)`;
            (this.listContainerStyles as any)['overflow-y'] = 'scroll';
          }
        }),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }
}
