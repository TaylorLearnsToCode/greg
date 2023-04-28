import { AbstractQuantifiableItem } from '@shared/model/framework/abstract-quantifiable-item.model';

export interface QuantifiableItemComponent {
  PERSISTENCE_TYPE: string;

  handleEditItemEvent(item: AbstractQuantifiableItem): void;
}
