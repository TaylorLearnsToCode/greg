import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isBetween, isEmpty } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbDungeonService implements DungeonGeneratorService {
  private readonly d6 = new DiceRolled();
  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  private stockingList: ReferenceEntryTable;
  private unguardedTreasureType: TreasureType;

  constructor(
    private dataService: DataManagerService,
    private encounterService: GenerateEncounterService,
    private treasureService: GenerateTreasureService
  ) {}

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string | undefined
  ): DungeonResult {
    this.deriveStockingList(dungeonLevel, stockingListRef);
    this.deriveUnguardedTreasureType(dungeonLevel);
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
        .filter((list) => list.system == (this.SUPPORTED_SYSTEMS as any)['LBB'])
        .find((list) => list.name.includes(`Level ${dungeonLevel}`));
      if (nextList != undefined) {
        this.stockingList = nextList;
      } else {
        throw new Error(
          `Stocking list not found for system ${this.SUPPORTED_SYSTEMS.LBB}, level ${dungeonLevel}`
        );
      }
    } else {
      this.stockingList = this.dataService.retrieveReference(
        stockingListRef as string,
        PERSISTENCE_TYPES.monsterEncounterList
      );
    }
  }

  // TODO - parameterize the "unguarded treasure" thing in the form! Maybe a <select>
  private deriveUnguardedTreasureType(dungeonLevel?: number): void {
    const level = dungeonLevel == undefined ? 1 : dungeonLevel;
    this.dataService
      .retrieveAll<ReferenceEntryTable>(PERSISTENCE_TYPES.treasureList)
      .forEach((ref) => {
        if (
          ref.name === 'Unguarded Treasure' &&
          ref.system == ('LBB' as SUPPORTED_SYSTEMS)
        ) {
          for (const entry of ref.entries) {
            if (isBetween(level, entry.chanceOf)) {
              this.unguardedTreasureType = this.dataService.retrieveReference(
                entry.reference,
                entry.persistenceType,
                'type'
              );
              return;
            }
          }
        }
      });
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
