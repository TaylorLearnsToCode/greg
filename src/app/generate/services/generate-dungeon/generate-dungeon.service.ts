import { Injectable } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { GenerateLbbDungeonService } from './generate-lbb-dungeon/generate-lbb-dungeon.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateDungeonService {
  private generatorService: DungeonGeneratorService;

  constructor(private lbbService: GenerateLbbDungeonService) {}

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string
  ): DungeonResult {
    this.verifySystemSet();
    return this.generatorService.generateDungeon(
      noRooms,
      dungeonLevel,
      stockingListRef
    );
  }

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

  private verifySystemSet(): void {
    if (!doesExist(this.generatorService)) {
      throw new Error(
        'System has not been selected: please select a system in order to continue'
      );
    }
  }
}