import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isBetween, isEmpty } from '@shared/utilities/common-util/common.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { DungeonGeneratorService } from './dungeon-generator-service.interface';
import { DungeonResult } from './dungeon-result.model';

export abstract class AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  abstract readonly TARGET_SYSTEM: string;

  protected readonly d6 = new DiceRolled();
  protected readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;
  protected readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  protected stockingList: ReferenceEntryTable;
  protected unguardedTreasureType: TreasureType;

  abstract generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string
  ): DungeonResult;

  // TODO - argument payload class; if no system is provided, default to TARGET_SYSTEM
  protected deriveStockingList(
    dataService: DataManagerService,
    targetSystem: string,
    dungeonLevel?: number,
    stockingListRef?: string
  ): void {
    this.verifyDeriveStockingList(dungeonLevel, stockingListRef);
    if (stockingListRef == undefined || isEmpty(stockingListRef)) {
      const encounterLists: ReferenceEntryTable[] =
        dataService.retrieveAll<ReferenceEntryTable>(
          PERSISTENCE_TYPES.monsterEncounterList
        );
      const prunedLists: ReferenceEntryTable[] = encounterLists.filter(
        (list) => list.system == targetSystem
      );
      const nextList: ReferenceEntryTable | undefined = prunedLists.find(
        (list) => list.name.includes(`Level ${dungeonLevel}`)
      );
      if (nextList != undefined) {
        this.stockingList = nextList;
      } else {
        throwError(
          `Stocking list not found for system ${targetSystem}, level ${dungeonLevel}`
        );
      }
    } else {
      this.stockingList = dataService.retrieveReference<ReferenceEntryTable>(
        stockingListRef as string,
        this.PERSISTENCE_TYPES.monsterEncounterList
      );
    }
  }

  protected deriveUnguardedTreasureType(
    dataService: DataManagerService,
    targetSystem: string,
    dungeonLevel?: number
  ): void {
    const level = dungeonLevel == undefined ? 1 : dungeonLevel;
    const allTables: ReferenceEntryTable[] =
      dataService.retrieveAll<ReferenceEntryTable>(
        this.PERSISTENCE_TYPES.treasureList
      );
    for (const table of allTables) {
      if (
        table.name === 'Unguarded Treasure' &&
        table.system == (targetSystem as SUPPORTED_SYSTEMS)
      ) {
        for (const entry of table.entries) {
          if (isBetween(level, entry.chanceOf)) {
            this.unguardedTreasureType = dataService.retrieveReference(
              [entry.reference, targetSystem],
              entry.persistenceType,
              ['type', 'system']
            );
            return;
          }
        }
      }
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
      throwError(
        'Either a stocking list reference or a dungeon level is required'
      );
    }
  }
}
