import { Injectable } from '@angular/core';
import { AbstractDungeonGenerator } from '@generate/model/abstract-dungeon-generator.model';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateBxDungeonService
  extends AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  readonly TARGET_SYSTEM: string = 'BX';

  constructor(private dataService: DataManagerService) {
    super();
  }

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number | undefined,
    stockingListRef?: string | undefined
  ): DungeonResult {
    this.deriveStockingList(
      this.dataService,
      this.TARGET_SYSTEM,
      dungeonLevel,
      stockingListRef
    );
    this.deriveUnguardedTreasureType(
      this.dataService,
      this.TARGET_SYSTEM,
      dungeonLevel
    );
    const dungeonResult = new DungeonResult();
    for (let i = 0; i < noRooms; i++) {
      dungeonResult.rooms.push(this.generateRoom());
    }
    return dungeonResult;
  }

  private generateRoom(): DungeonRoomResult {
    const room = new DungeonRoomResult();
    // TO DO implement procedure
    return room;
  }
}
