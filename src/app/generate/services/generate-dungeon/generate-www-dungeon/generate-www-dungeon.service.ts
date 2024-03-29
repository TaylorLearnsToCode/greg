import { Injectable } from '@angular/core';
import { AbstractDungeonGenerator } from '@generate/model/abstract-dungeon-generator.model';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { InspireSpecialDungeonRoomService } from '@generate/services/inspire-special-dungeon-room/inspire-special-dungeon-room.service';
import { InspireTrickOrTrapService } from '@generate/services/inspire-trick-or-trap/inspire-trick-or-trap.service';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateWwwDungeonService
  extends AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  readonly TARGET_SYSTEM = 'LBB';

  private readonly d8 = new DiceRolled({ pips: 8 });

  constructor(
    private dataService: DataManagerService,
    private encounterService: GenerateEncounterService,
    private inspireSpecialService: InspireSpecialDungeonRoomService,
    private inspireTrickOrTrapService: InspireTrickOrTrapService,
    private treasureService: GenerateTreasureService
  ) {
    super();
  }

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string
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

  private addMonsters(room: DungeonRoomResult): void {
    room.monsters.push(
      ...this.encounterService.generateEncounterFromList(this.stockingList)
    );
  }

  private addSpecial(room: DungeonRoomResult): void {
    room.specialFeature = this.inspireSpecialService.generateSpecialEffect();
  }

  private addTrap(room: DungeonRoomResult): void {
    room.trap = this.inspireTrickOrTrapService.generateTrickOrTrap();
  }

  private addTreasure(room: DungeonRoomResult): void {
    room.treasure.push(
      ...this.treasureService.generateTreasure(this.unguardedTreasureType)
    );
  }

  private generateRoom(): DungeonRoomResult {
    const room = new DungeonRoomResult();
    switch (rollDice(this.d8)) {
      case 1:
      case 2:
        this.addMonsters(room);
        break;
      case 3:
        this.addTrap(room);
        break;
      case 4:
        this.addSpecial(room);
        break;
      default:
        break;
    }
    this.handleTreasure(room);
    return room;
  }

  private handleTreasure(room: DungeonRoomResult): void {
    const roll = rollDice(this.d8);
    if (room.hasMonster && roll < 5) {
      this.addTreasure(room);
    } else if (room.hasTrap && roll < 4) {
      this.addTreasure(room);
    } else if (room.isSpecial && roll < 3) {
      this.addTreasure(room);
    } else if (roll === 1) {
      this.addTreasure(room);
    }
  }
}
