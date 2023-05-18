import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { AbstractDungeonGenerator } from '@generate/model/abstract-dungeon-generator.model';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isBetween } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbDungeonService
  extends AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  private readonly d6 = new DiceRolled();

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
      'LBB',
      dungeonLevel,
      stockingListRef
    );
    this.deriveUnguardedTreasureType(dungeonLevel);
    const dungeonResult = new DungeonResult();
    for (let i = 0; i < noRooms; i++) {
      dungeonResult.rooms.push(this.generateRoom());
    }
    return dungeonResult;
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
}
