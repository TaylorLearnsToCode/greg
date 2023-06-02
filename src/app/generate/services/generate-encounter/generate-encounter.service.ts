import { Injectable } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { EncounterGeneratorService } from '@generate/model/encounter-generator-service.interface';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { GenerateBxEncounterService } from './generate-bx-encounter/generate-bx-encounter.service';
import { GenerateLbbEncounterService } from './generate-lbb-encounter/generate-lbb-encounter.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateEncounterService {
  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  private generatorService: EncounterGeneratorService;

  constructor(
    private bxService: GenerateBxEncounterService,
    private lbbService: GenerateLbbEncounterService
  ) {}

  generateEncounterFromList(
    list: ReferenceEntryTable,
    targetSystem?: SUPPORTED_SYSTEMS
  ): EncounterResult[] {
    this.checkAndSetGeneratorService(targetSystem ? targetSystem : list.system);
    return this.generatorService.generateEncounterFromList(list);
  }

  private checkAndSetGeneratorService(system: SUPPORTED_SYSTEMS): void {
    switch ((this.SUPPORTED_SYSTEMS as any)[system]) {
      case this.SUPPORTED_SYSTEMS.BX:
        this.generatorService = this.bxService;
        break;
      case this.SUPPORTED_SYSTEMS.LBB:
        this.generatorService = this.lbbService;
        break;
      default:
        throwError(`Unsupported system ${system} specified.`);
    }
  }
}
