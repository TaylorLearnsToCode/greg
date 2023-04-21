import { AbstractRollableTable } from '@shared/model/framework/abstract-rollable-table.model';

/** Interface for use with components leveraging the GeneratorPageTemplateComponent template */
export interface GeneratorComponent {
  /** The persistence type of the article being generated */
  PERSISTENCE_TYPE: string;

  /** Handler method for when a Generate event occurs */
  handleGenerate(rollableTable: AbstractRollableTable): void;
}
