/** Implement this interface if the component is designed for use with the RollableTableTemplate */
export interface RollableTableComponent {
  /** Handler method for when the rollable table template emits an import event */
  handleImport(event: any): void;
}
