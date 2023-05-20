import { Component } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GeneratorComponent } from '@generate/model/generator-component.interface';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';

@Component({
  selector: 'greg-generate-monster-encounter',
  templateUrl: './generate-monster-encounter.component.html',
  styleUrls: ['./generate-monster-encounter.component.scss'],
})
export class GenerateMonsterEncounterComponent implements GeneratorComponent {
  readonly PERSISTENCE_TYPE: string = PERSISTENCE_TYPES.monsterEncounterList;

  encounterResults: EncounterResult[];

  constructor(private encounterService: GenerateEncounterService) {}

  handleGenerate(rollableTable: ReferenceEntryTable): void {
    this.encounterResults =
      this.encounterService.generateEncounterFromList(rollableTable);
  }
}
