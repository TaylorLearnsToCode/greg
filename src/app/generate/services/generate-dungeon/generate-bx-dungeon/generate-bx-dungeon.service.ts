import { Injectable } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { AbstractDungeonGenerator } from '@generate/model/abstract-dungeon-generator.model';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { DungeonRoomResult } from '@generate/model/dungeon-room-result.model';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist, isEmpty } from '@shared/utilities/common-util/common.util';
import {
  rollDice,
  rollOnMappedList,
} from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateBxDungeonService
  extends AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  readonly TARGET_SYSTEM: string = 'BX';

  private readonly d10 = new DiceRolled({ pips: 10 });

  private readonly SAMPLE_ROOM_TRAPS: Map<number, string> = new Map([
    [1, 'Poison gas: Save vs. Poison or die'],
    [2, 'Fog: Looks like Poison gas, but harmless'],
    [3, "Pit: Id6 points of damage per 10' fallen"],
    [
      4,
      'Ceiling Block falls: Save vs. Turn to Stone or take Id 10 points of damage',
    ],
    [5, 'Pendulum blade from ceiling: Id8 points of damage'],
    [6, 'Chute: No damage, but slide to the next level down'],
  ]);
  private readonly SAMPLE_TREASURE_TRAPS: Map<number, string> = new Map([
    [1, 'Poison needle: Save vs. Poison or die'],
    [2, 'Spring-fired darts: 1-6 darts hit for 1-4 points of damage each'],
    [3, 'Flash of light: Save vs. Spells or be blinded for Id8 turns'],
    [4, 'Poison snake'],
    [
      5,
      'Spray: Be sprayed with an unknown liquid that attracts Wandering Monsters; double chances for Id6 hours',
    ],
    [6, 'Illusion: Anything; often a monster'],
  ]);
  private readonly SAMPLE_SPECIAL_ROOMS: Map<number, string> = new Map([
    [1, 'Moaning room or corridor'],
    [2, 'Room turns or sinks while the door locks'],
    [3, 'Illusionary stairs or corridor'],
    [4, 'Shifting block to close off corridor'],
    [5, 'Trap door to tunnels'],
    [6, 'Alarm that summons special monster'],
    [7, 'Talking statue'],
    [8, 'Magic pool whose waters have a strange effect'],
    [9, 'Magic gate to another part of the dungeon'],
    [10, 'Flying weapons which attack only if disturbed'],
  ]);

  constructor(
    private dataService: DataManagerService,
    private encounterService: GenerateEncounterService,
    private treasureService: GenerateTreasureService
  ) {
    super();
  }

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number | undefined,
    stockingListRef?: string | undefined
  ): DungeonResult {
    this.deriveStockingList(
      this.dataService,
      'LBB',
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

  private addMonster(room: DungeonRoomResult): void {
    room.monsters.push(
      ...this.encounterService.generateEncounterFromList(this.stockingList)
    );
  }

  private addSpecial(room: DungeonRoomResult): void {
    room.specialFeature = `( Suggestion:${rollOnMappedList(
      this.SAMPLE_SPECIAL_ROOMS,
      this.d10
    )})`;
  }

  private addTrap(room: DungeonRoomResult): void {
    room.trap = `( Suggestion:${rollOnMappedList(this.SAMPLE_ROOM_TRAPS)})`;
  }

  private addTreasure(room: DungeonRoomResult): void {
    if (room.hasMonster) {
      this.handleTreasureFromMonster(room);
    }
    room.treasure.push(
      ...this.treasureService.generateTreasure({
        ...this.unguardedTreasureType,
        system: 'LBB' as SUPPORTED_SYSTEMS,
      } as TreasureType)
    );
  }

  private generateRoom(): DungeonRoomResult {
    const room = new DungeonRoomResult();
    switch (rollDice(this.d6)) {
      case 1:
      case 2:
        this.addMonster(room);
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
    const roll = rollDice(this.d6);
    if (room.hasMonster) {
      if (roll < 4) {
        this.addTreasure(room);
      } else {
        room.monsters.forEach((monster) => (monster.treasure = []));
      }
    } else if (room.hasMonster && roll < 4) {
    } else if (room.hasTrap && roll < 3) {
      this.addTreasure(room);
    } else if (roll === 1) {
      this.addTreasure(room);
    }
  }

  private handleTreasureFromMonster(room: DungeonRoomResult): void {
    if (!room.monsters.some((m) => !isEmpty(m.treasure))) {
      let monsterTreasureType: TreasureType;
      for (const encounterResult of room.monsters.filter(
        (monster) => !isEmpty(monster.treasureType)
      )) {
        monsterTreasureType = this.dataService.retrieveReference<TreasureType>(
          this.PERSISTENCE_TYPES.treasureType,
          encounterResult.treasureType,
          'type'
        );
        if (doesExist(monsterTreasureType)) {
          room.treasure.push(
            ...this.treasureService.generateTreasure(monsterTreasureType)
          );
        } else {
          console.warn(
            `Error determining treasure for ${encounterResult.name}`
          );
        }
        if (!isEmpty(room.treasure)) {
          return;
        }
      }
    }
  }
}
