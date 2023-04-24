import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { RollableTableComponent } from '@configure/model/rollable-table-component.interface';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureMap } from '@shared/model/treasure/treasure-map.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isEmpty } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'greg-configure-treasure-map',
  templateUrl: './configure-treasure-map.component.html',
  styleUrls: ['./configure-treasure-map.component.scss'],
})
export class ConfigureTreasureMapComponent
  implements OnInit, RollableTableComponent
{
  @ViewChild('importMapArticlesInput') importMapArticlesInputRef: ElementRef;

  readonly PERSISTENCE_TYPE = PERSISTENCE_TYPES.treasureMap;
  readonly MAP_TREASURE_ARTICLE = PERSISTENCE_TYPES.treasureMapRef;

  magicItemTableList$: Observable<ReferenceEntryTable[]>;
  treasureArticleForm: FormGroup;
  get treasureArticleTypeKeys(): string[] {
    return Object.keys(this.TREASURE_ARTICLE_TYPES).filter(
      (key) => key == 'GEMS' || key == 'JEWELRY' || key == 'SPECIE'
    );
  }
  treasureArticleType(key: string): string {
    return (this.TREASURE_ARTICLE_TYPES as any)[key];
  }
  treasureMapForm: FormGroup;
  treasureMapList$: Observable<TreasureMap[]>;
  treasureMapRefList$: Observable<TreasureArticle[]>;

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  private readonly TREASURE_ARTICLE_TYPES = TREASURE_ARTICLE_TYPES;

  private get importMapArticlesInput(): HTMLInputElement {
    return this.importMapArticlesInputRef.nativeElement as HTMLInputElement;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.treasureMapForm = buildFormFromObject(new TreasureMap()) as FormGroup;
    this.magicItemTableList$ = this.dataService.dataState$.pipe(
      map((state) => state.magicItemTables)
    );
    this.treasureMapList$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureMaps)
    );
    this.treasureMapRefList$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureMapRefs)
    );
    this.treasureMapRefList$ = combineLatest([
      this.dataService.dataState$.pipe(map((state) => state.treasureMapRefs)),
      this.treasureMapForm.valueChanges,
    ]).pipe(
      map(([treasureArticles, formMap]) =>
        treasureArticles.filter((article) =>
          this.filterMapRefListPredicate(article, new TreasureMap(formMap))
        )
      )
    );
    this.resetTreasureArticleForm();
  }

  /**
   * Adds a specified magic item to the treasure map's entries list
   *
   * @param  {ReferenceEntryTable} magicTable
   * */
  addMagicItemTable(magicTable: ReferenceEntryTable): void {
    (this.treasureMapForm.get('entries') as FormArray).push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: magicTable.name,
          persistenceType: this.PERSISTENCE_TYPES.magicItemTable,
        } as ReferenceEntry)
      )
    );
  }

  /**
   * Provided a treasure article - adds the treasure article to the active form.
   *
   * @param  {TreasureArticle} reference
   */
  addSavedMapTreasureReference(reference: TreasureArticle): void {
    (this.treasureMapForm.get('entries') as FormArray).push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: reference.name,
          persistenceType: this.MAP_TREASURE_ARTICLE,
        } as ReferenceEntry)
      )
    );
  }

  /**
   * Removes currently filtered treasure articles from map treasure article browser storage
   *
   * @param  {TreasureArticle[]} filteredList
   */
  clearMapTreasureArticles(filteredList: TreasureArticle[]): void {
    for (const article of filteredList) {
      this.dataService.delete(article, this.MAP_TREASURE_ARTICLE);
    }
  }

  /**
   * Removes a target treasure map entry from local storage.
   *
   * @param  {TreasureArticle} entry
   */
  deleteTreasureMapArticleEntry(entry: TreasureArticle): void {
    this.dataService.delete(entry, this.MAP_TREASURE_ARTICLE);
  }

  /**
   * Positions a specified treasure article in the edit form, eligible to add to the
   * treasure map under composition. Any unsaved changes in the form will be lost.
   *
   * @param  {TreasureArticle} entry
   */
  editTreasureMapArticleEntry(entry: TreasureArticle): void {
    this.treasureArticleForm = buildFormFromObject(
      new TreasureArticle(entry)
    ) as FormGroup;
  }

  /**
   * Exports the currently visible list of map treasure articles to the user's device
   *
   * @param  {TreasureArticle[]} filteredList
   */
  exportMapTreasureArticles(filteredList: TreasureArticle[]): void {
    this.dataService.exportObject(
      filteredList,
      this.treasureMapForm.value.system + '-' + this.treasureMapForm.value.name,
      this.MAP_TREASURE_ARTICLE.toUpperCase()
    );
  }

  /**
   * When an edit event is received, replace the active form.
   *
   * @param  {TreasureMap} treasureMap
   */
  handleEditSavedTable(treasureMap: TreasureMap): void {
    this.treasureMapForm = buildFormFromObject(
      new TreasureMap(treasureMap)
    ) as FormGroup;
  }

  /**
   * When a file import event occurs from the template, the inbound event
   * assumed to be a TreasureMap, inserts the new event into the active form.
   *
   * Unsaved changes are lost.
   *
   * @param  {TreasureMap} event
   */
  handleImport(event: TreasureMap): void {
    this.treasureMapForm = buildFormFromObject(
      new TreasureMap(event)
    ) as FormGroup;
  }

  /**
   * Adds a provided treasure map as a nested entry in the active map under edit.
   * @param  {TreasureMap} event
   */
  handleNestSavedTable(event: TreasureMap): void {
    (this.treasureMapForm.get('entries') as FormArray).push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: event.name,
          persistenceType: this.PERSISTENCE_TYPES.treasureMap,
        } as ReferenceEntry)
      )
    );
  }

  /** Imports map treasure articles from the user's machine and appends to those in browser storage */
  importMapTreasureArticles(): void {
    this.importMapArticlesInput.click();
  }

  /** Handler method for import treasure article event */
  onImportMapTreasureArticles(): void {
    if (this.importMapArticlesInput.files?.length) {
      this.dataService.import<TreasureArticle[]>(
        this.importMapArticlesInput.files[0],
        this.MAP_TREASURE_ARTICLE
      );
    }
  }

  /** Rebuilds the treasureArticleForm object with a fresh TreasureArticle */
  resetTreasureArticleForm(): void {
    this.treasureArticleForm = buildFormFromObject(
      new TreasureArticle({ type: 'SPECIE' })
    ) as FormGroup;
  }

  /**
   * Saves the current article in the treasure article form as a reference and
   * adds it to the treasure map under edit.
   */
  saveMapTreasureArticle(): void {
    this.dataService.persist(this.MAP_TREASURE_ARTICLE, {
      ...this.treasureArticleForm.value,
      name: this.buildActiveMapTreasureArticleName(),
    });
    this.resetTreasureArticleForm();
  }

  /**
   * Shifts the magic item at the specified index in the saved magic items list one
   * position in the specified direction.
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftMagicItemTable(index: number, direction: string): void {
    this.dataService.shiftListEntry(
      this.PERSISTENCE_TYPES.magicItemTable,
      index,
      direction
    );
  }

  /** Builds a specific special string from the active map and article under edit. */
  private buildActiveMapTreasureArticleName(): string {
    return [
      this.treasureMapForm.value.system,
      this.treasureMapForm.value.name,
      this.treasureArticleForm.value.name,
    ].join('-');
  }

  /**
   * Returns true if:
   * * The current map does not contain a Name or System
   * * The current map contains a name or system and the article references either or both in its name
   *
   * Returns false otherwise.
   *
   * @param  {TreasureArticle} article
   * @param  {TreasureMap} currentMap
   */
  private filterMapRefListPredicate(
    article: TreasureArticle,
    currentMap: TreasureMap
  ): boolean {
    console.warn(currentMap);
    const nameIsEmpty = isEmpty(currentMap.name);
    const systemIsEmpty = isEmpty(currentMap.system);
    if (
      (nameIsEmpty && systemIsEmpty) ||
      (!nameIsEmpty &&
        systemIsEmpty &&
        article.name.includes(currentMap.name)) ||
      (nameIsEmpty &&
        !systemIsEmpty &&
        article.name.includes(currentMap.system)) ||
      (!nameIsEmpty &&
        !systemIsEmpty &&
        article.name.includes(currentMap.name) &&
        article.name.includes(currentMap.system))
    ) {
      return true;
    }
    return false;
  }
}
