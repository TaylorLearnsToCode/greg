/** Interface to be implemented by components containing a TreasureArticleFormComponent element */
export interface TreasureArticleForm {
  /**
   * Handler method to remove a target article from the collection to which it is member.
   *
   * @param  {any} identifier Index or other identifier of the article, itself: of which the TreasureArticleForm component is unaware
   */
  handleRemoveArticle(identifier: any): void;

  /**
   * Handler method to allow the article to shift up or down in the collection to which
   * it is member.
   *
   * @param  {any} identifier Index or other identifier of the article, itself: of which the TreasureArticleForm component is unaware
   * @param  {string} direction "up" or "down": to be emitted by the shiftArticleEvent
   */
  handleShiftArticle(identifier: any, direction: string): void;
}
