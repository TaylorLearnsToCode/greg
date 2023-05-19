import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isBetween, isEmpty } from '@shared/utilities/common-util/common.util';
import { DungeonGeneratorService } from './dungeon-generator-service.interface';
import { DungeonResult } from './dungeon-result.model';

export abstract class AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  abstract readonly TARGET_SYSTEM: string;

  protected readonly d6 = new DiceRolled();
  protected readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

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
      const nextList = dataService
        .retrieveAll<ReferenceEntryTable>(
          PERSISTENCE_TYPES.monsterEncounterList
        )
        .filter(
          (list) => list.system == (this.SUPPORTED_SYSTEMS as any)[targetSystem]
        )
        .find((list) => list.name.includes(`Level ${dungeonLevel}`));
      if (nextList != undefined) {
        this.stockingList = nextList;
      } else {
        throw new Error(
          `Stocking list not found for system ${this.SUPPORTED_SYSTEMS.LBB}, level ${dungeonLevel}`
        );
      }
    } else {
      this.stockingList = dataService.retrieveReference<ReferenceEntryTable>(
        stockingListRef as string,
        PERSISTENCE_TYPES.monsterEncounterList
      );
    }
  }

  protected deriveUnguardedTreasureType(
    dataService: DataManagerService,
    targetSystem: string,
    dungeonLevel?: number
  ): void {
    const level = dungeonLevel == undefined ? 1 : dungeonLevel;
    dataService
      .retrieveAll<ReferenceEntryTable>(PERSISTENCE_TYPES.treasureList)
      .forEach((ref) => {
        if (
          ref.name === 'Unguarded Treasure' &&
          ref.system == (targetSystem as SUPPORTED_SYSTEMS)
        ) {
          for (const entry of ref.entries) {
            if (isBetween(level, entry.chanceOf)) {
              this.unguardedTreasureType = dataService.retrieveReference(
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
