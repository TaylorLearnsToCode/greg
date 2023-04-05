import { AbstractRollableTable } from '../framework/abstract-rollable-table.model';
import { ReferenceEntry } from '../framework/reference-entry.model';
import { TreasureArticle } from './treasure-article.model';

/** Model object for in-game maps leading to gold, jewels, magic items, and other treasure */
export class TreasureMap extends AbstractRollableTable {
  /** TreasureArticle (specie, gems, etc.) or ReferenceEntry (magic items) led to by the map */
  entries: (TreasureArticle | ReferenceEntry)[];
}
