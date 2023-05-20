import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { TREASURE_ARTICLE_TYPES } from '@assets/app-configs/treasure-article-types.config';
import { TreasureArticleForm } from '@configure/model/treasure-article-form.interface';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { sortByField } from '@shared/utilities/common-util/common.util';
import {
  buildFormFromObject,
  shiftFormArrayEntry,
} from '@shared/utilities/form-util/form.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-configure-treasure-type',
  templateUrl: './configure-treasure-type.component.html',
  styleUrls: ['./configure-treasure-type.component.scss'],
})
export class ConfigureTreasureTypeComponent
  implements OnInit, TreasureArticleForm
{
  @ViewChild('treasureTypeImport') treasureTypeImportRef: ElementRef;
  @ViewChild('treasureTypeListImport') treasureTypeListImportRef: ElementRef;

  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  readonly TREASURE_TYPE = PERSISTENCE_TYPES.treasureType.toUpperCase();

  get articleTypeKeys(): string[] {
    return Object.keys(TREASURE_ARTICLE_TYPES).map((key) => key);
  }
  articleValue(key: string): string {
    return (TREASURE_ARTICLE_TYPES as any)[key];
  }
  get articlesFormArray(): FormArray<FormGroup> {
    return this.treasureTypeForm.get('entries') as FormArray<FormGroup>;
  }
  magicItemTableList$: Observable<ReferenceEntryTable[]>;
  supportedSystem(key: string): string {
    return (SUPPORTED_SYSTEMS as any)[key];
  }
  get supportedSystems(): string[] {
    return Object.keys(SUPPORTED_SYSTEMS).map((key) => key);
  }
  treasureTypeForm: FormGroup;
  treasureTypes$: Observable<TreasureType[]>;

  private get treasureTypeImport(): HTMLInputElement {
    return this.treasureTypeImportRef.nativeElement as HTMLInputElement;
  }
  private get treasureTypeListImport(): HTMLInputElement {
    return this.treasureTypeListImportRef.nativeElement as HTMLInputElement;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.treasureTypeForm = buildFormFromObject(
      new TreasureType()
    ) as FormGroup;
    this.magicItemTableList$ = this.dataService.dataState$.pipe(
      map((dataState) => [
        ...dataState.magicItemTables,
        ...dataState.treasureMaps,
      ])
    );
    this.treasureTypes$ = this.dataService.dataState$.pipe(
      map((dataState) => {
        const types = dataState.treasureTypes.map((t) => new TreasureType(t));
        sortByField(types, 'type');
        return types;
      })
    );
  }

  /**
   * Adds a configured ReferenceEntryTable as a TreasureArticle to the Treasure Type
   * under edit.
   *
   * @param  {ReferenceEntryTable} table
   */
  addReferenceTable(table: ReferenceEntryTable): void {
    this.articlesFormArray.push(
      buildFormFromObject(
        new TreasureArticle({
          name: table.name,
          quantity: 1,
        } as TreasureArticle)
      ) as FormGroup
    );
  }

  /** Adds a blank Treasure Article to the end of the Treasure Articles list */
  addTreasureArticle(): void {
    this.articlesFormArray.push(
      buildFormFromObject(new TreasureArticle()) as FormGroup
    );
  }

  /** Removes all treasure types from browser storage */
  clearTreasureTypeList(): void {
    this.dataService.clear(this.PERSISTENCE_TYPES.treasureType);
  }

  /** Rebuilds the treasure type form, clearing out all state from it */
  clearTreasureTypeForm(): void {
    this.treasureTypeForm = buildFormFromObject(
      new TreasureType()
    ) as FormGroup;
  }

  /**
   * Removes a target Treasure Type from browser local storage
   *
   * @param  {TreasureType} type
   */
  deleteTreasureType(type: TreasureType): void {
    this.dataService.delete(type, this.PERSISTENCE_TYPES.treasureType);
  }

  /**
   * Loads a target Treasure Type into the UI form for editing.
   * Unsaved changes in the form when edit is selected are lost.
   *
   * @param  {TreasureType} type
   */
  editTreasureType(type: TreasureType): void {
    this.treasureTypeForm = buildFormFromObject(
      new TreasureType(type)
    ) as FormGroup;
  }

  /**
   * Exports the current active Treasure Type to JSON format, downloading
   * to the user's machine.
   */
  exportTreasureType(): void {
    this.dataService.exportObject(
      this.treasureTypeForm.value,
      ''.concat(
        this.treasureTypeForm.value.system,
        '-',
        this.treasureTypeForm.value.type
      ),
      `.${this.TREASURE_TYPE}`
    );
  }

  /**
   * Exports the visible list of treasure types on the right panel
   * from browser storage to the user's local machine
   */
  exportTreasureTypeList(): void {
    this.dataService.exportFromStorage(this.PERSISTENCE_TYPES.treasureType);
  }

  /**
   * Removes the Treasure Article at a provided index from the Treasure Articles list.
   *
   * @param  {number} index
   */
  handleRemoveArticle(index: number): void {
    this.articlesFormArray.removeAt(index);
  }

  /**
   * Moves a target Treasure Article up or down in the display according to
   * the provided direction argument.
   *
   * @param  {number} index
   * @param  {string} direction 'up' or 'down', case sensitive, are supported.
   */
  handleShiftArticle(index: number, direction: string): void {
    shiftFormArrayEntry(index, direction, this.articlesFormArray);
  }

  /** Opens file import to select treasure type to load into memory */
  importTreasureType(): void {
    this.treasureTypeImport.click();
  }

  /** Opens file import to select treasure type list to load into browser storage */
  importTreasureTypeList(): void {
    this.treasureTypeListImport.click();
  }

  /** Handler function for import event on Treasure Type */
  onTreasureTypeImport(): void {
    if (this.treasureTypeImport.files?.length) {
      (
        this.dataService.import<TreasureType>(
          this.treasureTypeImport.files[0]
        ) as Observable<TreasureType>
      ).subscribe((type) => {
        this.treasureTypeForm = buildFormFromObject(
          new TreasureType(type)
        ) as FormGroup;
        this.treasureTypeImport.value = '';
      });
    } else {
      throwError('No treasure type import file found.');
    }
  }

  /** Handler function for import event on Treasure Type List */
  onTreasureTypeListImport(): void {
    if (this.treasureTypeListImport.files?.length) {
      this.dataService.import<TreasureType[]>(
        this.treasureTypeListImport.files[0],
        this.PERSISTENCE_TYPES.treasureType
      );
      this.treasureTypeListImport.value = '';
    } else {
      throwError('No treasure type import file found.');
    }
  }

  /** Persists the current active treasure type to browser storage */
  saveTreasureType(): void {
    this.dataService.persist(
      this.PERSISTENCE_TYPES.treasureType,
      this.treasureTypeForm.value
    );
  }
}
