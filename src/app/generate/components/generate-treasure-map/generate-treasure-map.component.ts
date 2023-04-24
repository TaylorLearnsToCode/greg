import { Component } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { GeneratorComponent } from '@generate/model/generator-component.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';

@Component({
  selector: 'greg-generate-treasure-map',
  templateUrl: './generate-treasure-map.component.html',
  styleUrls: ['./generate-treasure-map.component.scss'],
})
export class GenerateTreasureMapComponent implements GeneratorComponent {
  readonly PERSISTENCE_TYPE = PERSISTENCE_TYPES.treasureMap;

  prettyName(articleName: string): string {
    const articleArray: string[] = articleName.split('-');
    return articleArray[articleArray.length - 1];
  }
  targetMap: ReferenceEntryTable;
  treasureMapResult: TreasureMapResult;

  constructor(private treasureService: GenerateTreasureService) {}

  handleGenerate(rollableTable: ReferenceEntryTable): void {
    this.targetMap = rollableTable;
    this.treasureMapResult =
      this.treasureService.generateTreasureFromTreasureMap(rollableTable);
  }
}
