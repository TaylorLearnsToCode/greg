import { AbstractTreasureItem } from '@treasure/treasure-common/model/treasure-item.model';

export class MagicItem extends AbstractTreasureItem {
  type: string = '';
  description: string = '';
}

export class MagicItemList {
  name: string = '';
  entries: MagicItem[] = [];
}
