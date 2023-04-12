import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureMap } from '@shared/model/treasure/treasure-map.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'greg-configure-treasure-map',
  templateUrl: './configure-treasure-map.component.html',
  styleUrls: ['./configure-treasure-map.component.scss'],
})
export class ConfigureTreasureMapComponent implements OnInit {
  magicItemList$: Observable<MagicItem[]>;
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
  treasureMapRefList$: Observable<TreasureArticle[]>;

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;
  private readonly TREASURE_ARTICLE_TYPES = TREASURE_ARTICLE_TYPES;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.magicItemList$ = this.dataService.dataState$.pipe(
      map((state) => state.magicItems)
    );
    this.treasureMapRefList$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureMapRefs)
    );
    this.treasureMapForm = buildFormFromObject(new TreasureMap()) as FormGroup;
    this.resetTreasureArticleForm();
  }

  /**
   * Adds a specified magic item to the treasure map's entries list
   * @param  {MagicItem} magicItem
   */
  addMagicItem(magicItem: MagicItem): void {
    (this.treasureMapForm.get('entries') as FormArray).push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: magicItem.name,
          persistenceType: this.PERSISTENCE_TYPES.magicItem,
        } as ReferenceEntry)
      )
    );
  }

  /**
   * Saves the current article in the treasure article form as a reference and
   * adds it to the treasure map under edit.
   */
  addMapTreasureArticle(): void {
    this.dataService.persist(
      this.PERSISTENCE_TYPES.treasureMapRef,
      this.treasureArticleForm.value
    );
    (this.treasureMapForm.get('entries') as FormArray).push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: [
            this.treasureMapForm.value.system,
            this.treasureMapForm.value.name,
            this.treasureArticleForm.value.name,
          ].join('-'),
          persistenceType: this.PERSISTENCE_TYPES.treasureMapRef,
        } as ReferenceEntry)
      )
    );
    this.resetTreasureArticleForm();
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
          persistenceType: this.PERSISTENCE_TYPES.treasureMapRef,
        } as ReferenceEntry)
      )
    );
  }

  /**
   * Removes a target treasure map entry from local storage.
   *
   * @param  {TreasureArticle} entry
   */
  deleteTreasureMapEntry(entry: TreasureArticle): void {
    this.dataService.delete(entry, this.PERSISTENCE_TYPES.treasureMapRef);
  }

  /** Rebuilds the treasureArticleForm object with a fresh TreasureArticle */
  resetTreasureArticleForm(): void {
    this.treasureArticleForm = buildFormFromObject(
      new TreasureArticle({ type: 'SPECIE' })
    ) as FormGroup;
  }

  /**
   * Shifts the magic item at the specified index in the saved magic items list one
   * position in the specified direction.
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftMagicItem(index: number, direction: string): void {
    this.dataService.shiftListEntry(
      this.PERSISTENCE_TYPES.magicItem,
      index,
      direction
    );
  }
}
