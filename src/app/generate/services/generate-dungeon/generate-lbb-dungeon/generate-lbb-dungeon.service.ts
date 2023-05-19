import { Injectable } from '@angular/core';
import { AbstractDungeonGenerator } from '@generate/model/abstract-dungeon-generator.model';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbDungeonService
  extends AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  private readonly LBB = 'LBB';

  constructor(
    private dataService: DataManagerService,
    private encounterService: GenerateEncounterService,
    private treasureService: GenerateTreasureService
  ) {
    super();
  }

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string | undefined
  ): DungeonResult {
    this.deriveStockingList(
      this.dataService,
      this.LBB,
      dungeonLevel,
      stockingListRef
    );
    this.deriveUnguardedTreasureType(this.dataService, this.LBB, dungeonLevel);
    const dungeonResult = new DungeonResult();
    for (let i = 0; i < noRooms; i++) {
      dungeonResult.rooms.push(this.generateRoom());
    }
    return dungeonResult;
  }

  private generateRoom(): DungeonRoomResult {
    const room = new DungeonRoomResult();
    this.handleMonsters(room);
    this.handleTreasure(room);
    return room;
  }

  private handleMonsters(room: DungeonRoomResult): void {
    if (rollDice(this.d6) < 3) {
      room.monsters.push(
        ...this.encounterService
          .generateEncounterFromList(this.stockingList)
          .map(
            (result) =>
              new EncounterResult({
                ...result,
                treasure: [],
              })
          )
      );
    }
  }

  private handleTreasure(room: DungeonRoomResult): void {
    if (room.hasMonster ? rollDice(this.d6) < 4 : rollDice(this.d6) < 2) {
      room.treasure.push(
        ...this.treasureService.generateTreasure(this.unguardedTreasureType)
      );
    }
  }
}
