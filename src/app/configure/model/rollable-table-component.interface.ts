/** Implement this interface if the component is designed for use with the RollableTableTemplate */
export interface RollableTableComponent {
  /** Supported persistence type to be imported/exported by the table */
  PERSISTENCE_TYPE: string;

  /** Handler method for when the rollable table template emits an edit saved table event */
  handleEditSavedTable(event: any): void;

  /** Handler method for when the rollable table template emits an import event */
  handleImport(event: any): void;
}
