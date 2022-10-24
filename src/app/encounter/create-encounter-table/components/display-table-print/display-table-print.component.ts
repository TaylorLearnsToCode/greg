import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EncounterRowTypes } from '@encounter/create-encounter-table/model/encounter-row-types.enum';
import { EncounterTable } from '@encounter/encounter-shared/model/encounter-table.model';
import { Encounter } from '@encounter/encounter-shared/model/encounter.model';
import { IRollMapping } from '@shared/model/roll-index-mapping.interface';
import { doesExist } from '@shared/utilities/common-util/common.util';

@Component({
  selector: 'greg-display-table-print',
  templateUrl: './display-table-print.component.html',
  styleUrls: ['./display-table-print.component.scss'],
})
export class DisplayTablePrintComponent implements OnInit, OnChanges {
  @Input() encounterTable: EncounterTable;

  readonly ROW_TYPES = EncounterRowTypes;

  get encounterRollMapping(): IRollMapping[] {
    return this.encounterTable.encounterRollMapping;
  }

  get encounters(): Array<Encounter | EncounterTable> {
    return this.encounterTable.encounters as Array<Encounter | EncounterTable>;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  getRowType(encounter: Encounter | EncounterTable): EncounterRowTypes {
    if (doesExist((encounter as Encounter).monsters)) {
      return EncounterRowTypes.ENCOUNTER;
    } else if (doesExist((encounter as EncounterTable).encounters)) {
      return EncounterRowTypes.TABLE;
    } else {
      return EncounterRowTypes.UNDEFINED;
    }
  }
}
