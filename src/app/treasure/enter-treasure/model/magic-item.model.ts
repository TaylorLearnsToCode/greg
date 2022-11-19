import { AbstractTreasureItem } from './treasure-item.model';

export class MagicItem extends AbstractTreasureItem {
  type: string = '';
  description: string = '';
}

export class MagicItemListEntry {
  name: string = '';
  entries: MagicItem[] = [];
}
