import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Encounter } from '@encounter/create-encounter-table/model/encounter.model';
import { cloneObject } from '@shared/utilities/common-util/common.util';
import { formValueToMonster } from '@shared/utilities/conversion-util/conversion.util';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../../model/encounter-table.model';

/** Render component housing display elements for a given encounter table. */
@Component({
  selector: 'greg-encounter-table-display',
  templateUrl: './encounter-table-display.component.html',
  styleUrls: ['./encounter-table-display.component.scss'],
})
export class EncounterTableDisplayComponent implements OnChanges {
  /** The current encounter tablee under scrutiny. */
  @Input() encounterTable: EncounterTable;
  /** Event Emitter to propagate IEncounterTableActions to parent components. */
  @Output() encounterTableAction = new EventEmitter<IEncounterTableAction>();

  /** The current file specified for import by the user. */
  importedRawFile: File;

  /** OnChanges lifecycle method. */
  ngOnChanges(): void {
    this.encounterTable = cloneObject(this.encounterTable);
    (this.encounterTable.encounters as Encounter[]).forEach((encounter) => {
      encounter.monsters = encounter.monsters.map((monster) =>
        formValueToMonster(monster)
      );
    });
  }

  /** Removes the currently specified upload file. */
  clearImportFile(): void {
    this.importedRawFile = undefined;
  }

  /** Emits the current encounter table to be exported to file and saved on the client machine. */
  exportToJson(): void {
    this.encounterTableAction.emit({
      action: EncounterTableActions.EXPORT_JSON,
      payload: this.encounterTable,
    } as IEncounterTableAction);
  }

  /** Parses the file specified by the user and emits it to declaratively update the state. */
  importFromJson(): void {
    this.importedRawFile.text().then((value: string) => {
      this.encounterTableAction.emit({
        action: EncounterTableActions.UPDATE_TABLE,
        payload: JSON.parse(value),
      } as IEncounterTableAction);
    });
  }

  /**
   * Event listener for changes to the import file input.
   * @param  {HTMLInputElement} changedInput
   */
  onFileInput(changedInput: HTMLInputElement): void {
    this.importedRawFile = changedInput.files.item(0);
  }
}
