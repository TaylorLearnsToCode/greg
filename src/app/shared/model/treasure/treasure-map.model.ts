import { doesExist } from '@shared/utilities/common-util/common.util';
import { AbstractRollableTable } from '../framework/abstract-rollable-table.model';
import { ReferenceEntry } from '../framework/reference-entry.model';

/** Model object for in-game maps leading to gold, jewels, magic items, and other treasure */
export class TreasureMap extends AbstractRollableTable {
  /** TreasureArticle (specie, gems, etc.) or ReferenceEntry (magic items) led to by the map */
  entries: ReferenceEntry[] = [];

  constructor(map?: any) {
    super(map);
    this.constructEntries(map);
  }

  private constructEntries(map?: any): void {
    if (doesExist(map) && doesExist(map.entries)) {
      for (const entry of map.entries) {
        this.entries.push(new ReferenceEntry(entry));
      }
    }
  }
}
