import { Injectable } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { GenerateLbbDungeonService } from './generate-lbb-dungeon/generate-lbb-dungeon.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateDungeonService {
  private generatorService: DungeonGeneratorService;

  constructor(private lbbService: GenerateLbbDungeonService) {}

  setSystemSelection(selectedSystem: string): void {
    const system: string = (SUPPORTED_SYSTEMS as any)[selectedSystem];
    switch (system) {
      case SUPPORTED_SYSTEMS.LBB:
        this.generatorService = this.lbbService;
        break;
      default:
        throw new Error(`Unsupported system ${system} detected`);
    }
  }
}
