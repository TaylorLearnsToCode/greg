import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isEmpty } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbDungeonService implements DungeonGeneratorService {
  private readonly d6 = new DiceRolled();

  private stockingList: ReferenceEntryTable;

  constructor(private dataService: DataManagerService) {}

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string | undefined
  ): DungeonResult {
    this.deriveStockingList(dungeonLevel, stockingListRef);
    const dungeonResult = new DungeonResult();
    for (let i = 0; i < noRooms; i++) {
      dungeonResult.rooms.push(this.generateRoom());
    }
    return dungeonResult;
  }

  private deriveStockingList(
    dungeonLevel?: number,
    stockingListRef?: string
  ): void {
    this.verifyDeriveStockingList(dungeonLevel, stockingListRef);
    if (stockingListRef == undefined || isEmpty(stockingListRef)) {
      const nextList = this.dataService
        .retrieveAll<ReferenceEntryTable>(
          PERSISTENCE_TYPES.monsterEncounterList
        )
        .filter((list) => list.system == (SUPPORTED_SYSTEMS as any)['LBB'])
        .find((list) => list.name.includes(`Level ${dungeonLevel}`));
      if (nextList != undefined) {
        this.stockingList = nextList;
      } else {
        throw new Error(
          `Stocking list not found for system ${SUPPORTED_SYSTEMS.LBB}, level ${dungeonLevel}`
        );
      }
    } else {
      this.stockingList = this.dataService.retrieveReference(
        stockingListRef as string,
        PERSISTENCE_TYPES.monsterEncounterList
      );
    }
  }

  private generateRoom(): DungeonRoomResult {
    const room = new DungeonRoomResult();
    room.hasMonster = rollDice(this.d6) < 3;
    room.hasTreasure = room.hasMonster
      ? rollDice(this.d6) < 4
      : rollDice(this.d6) < 2;
    return room;
  }

  private verifyDeriveStockingList(
    dungeonLevel?: number,
    stockingListRef?: string
  ): void {
    if (
      dungeonLevel == undefined &&
      (stockingListRef == undefined || isEmpty(stockingListRef))
    ) {
      throw new Error(
        'Either a stocking list reference or a dungeon level is required'
      );
    }
  }
}
