import { Injectable } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { GenerateBxTreasureService } from './generate-bx-treasure/generate-bx-treasure.service';
import { GenerateLbbTreasureService } from './generate-lbb-treasure/generate-lbb-treasure.service';
import { GenerateWwwTreasureService } from './generate-www-treasure/generate-www-treasure.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateTreasureService {
  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  private generatorService: TreasureGeneratorService;

  constructor(
    private bxService: GenerateBxTreasureService,
    private lbbService: GenerateLbbTreasureService,
    private wwwService: GenerateWwwTreasureService
  ) {}

  generateTreasure(treasureType: TreasureType): TreasureResult[] {
    this.checkAndSetGeneratorService(treasureType.system);
    return this.generatorService.generateTreasureByTreasureType(treasureType);
  }

  generateTreasureFromTreasureMap(map: ReferenceEntryTable): TreasureMapResult {
    this.checkAndSetGeneratorService(map.system);
    const returnMap = this.generatorService.generateTreasureMapResult(map);
    return doesExist(returnMap)
      ? (returnMap as TreasureMapResult)
      : new TreasureMapResult();
  }

  private checkAndSetGeneratorService(system: SUPPORTED_SYSTEMS): void {
    switch ((this.SUPPORTED_SYSTEMS as any)[system]) {
      case this.SUPPORTED_SYSTEMS.BX:
        this.generatorService = this.bxService;
        break;
      case this.SUPPORTED_SYSTEMS.LBB:
        this.generatorService = this.lbbService;
        break;
      case this.SUPPORTED_SYSTEMS.WWW:
        this.generatorService = this.wwwService;
        break;
      default:
        throwError(`Unsupported system ${system} specified.`);
    }
  }
}
