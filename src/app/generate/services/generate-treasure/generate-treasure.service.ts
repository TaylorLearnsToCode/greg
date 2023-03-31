import { Injectable } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
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
    return this.generatorService.generateTreasureByType(treasureType);
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
        throw new Error(`Unsupported system ${system} specified.`);
    }
  }
}
