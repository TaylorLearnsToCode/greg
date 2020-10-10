import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../model/encounter-table.model';

@Component({
  selector: 'greg-encounter-table-display',
  templateUrl: './encounter-table-display.component.html',
  styleUrls: ['./encounter-table-display.component.scss'],
})
export class EncounterTableDisplayComponent implements OnInit {
  @Input() encounterTable: EncounterTable;
  @Output() encounterTableAction = new EventEmitter<IEncounterTableAction>();

  constructor() {}

  ngOnInit(): void {}

  exportToJson(): void {
    this.encounterTableAction.emit({
      action: EncounterTableActions.EXPORT_JSON,
      payload: this.encounterTable,
    } as IEncounterTableAction);
  }
}
