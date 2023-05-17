import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { sortByField } from '@shared/utilities/common-util/common.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-treasure-article-form',
  templateUrl: './treasure-article-form.component.html',
  styleUrls: ['./treasure-article-form.component.scss'],
})
export class TreasureArticleFormComponent implements OnInit {
  @Input() articleForm: FormGroup;
  @Input() enableMagicItemHint: boolean;
  // @TODO - implement this: if false, don't do shift or delete
  @Input() isInCollection: boolean;

  @Output() removeArticleEvent = new EventEmitter();
  @Output() shiftArticleEvent = new EventEmitter();

  /** Keys array to supported treasure article types */
  get articleTypeKeys(): string[] {
    return Object.keys(TREASURE_ARTICLE_TYPES).map((key) => key);
  }
  /**
   * Pseudo-accessor, returning a human-readable treasure article type based on a
   * provided key value.
   *
   * @param  {string} key
   */
  articleValue(key: string): string {
    return (TREASURE_ARTICLE_TYPES as any)[key];
  }
  /** Configured magic item lists */
  magicItemList$: Observable<ReferenceEntryTable[]>;
  /** If the type selected is "magic item", the magic item list should be shown below */
  get showMagicItemList(): boolean {
    return (
      this.enableMagicItemHint &&
      this.articleForm.get('type')?.value == 'MAGIC_ITEM'
    );
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.magicItemList$ = this.dataService.dataState$.pipe(
      map((state) => {
        const magicItemList = state.magicItemTables.map(
          (t) => new ReferenceEntryTable(t)
        );
        sortByField(magicItemList);
        return magicItemList;
      })
    );
  }

  addToArticle(itemList: ReferenceEntryTable): void {
    this.articleForm.get('name')?.setValue(itemList.name);
  }

  removeArticle(): void {
    this.removeArticleEvent.emit();
  }

  shiftArticle(direction: string): void {
    this.shiftArticleEvent.emit(direction);
  }
}
