import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TREASURE_ARTICLE_TYPES } from '@assets/treasure-article-types.config';

@Component({
  selector: 'greg-treasure-article-form',
  templateUrl: './treasure-article-form.component.html',
  styleUrls: ['./treasure-article-form.component.scss'],
})
export class TreasureArticleFormComponent {
  @Input() articleForm: FormGroup;
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

  private readonly TREASURE_ARTICLE_TYPES = TREASURE_ARTICLE_TYPES;

  constructor() {}

  removeArticle(): void {
    this.removeArticleEvent.emit();
  }

  shiftArticle(direction: string): void {
    this.shiftArticleEvent.emit(direction);
  }
}
