import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isEmpty } from '@shared/utilities/common-util/common.util';
import { DungeonGeneratorService } from './dungeon-generator-service.interface';
import { DungeonResult } from './dungeon-result.model';

export abstract class AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  protected readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  protected stockingList: ReferenceEntryTable;
  protected unguardedTreasureType: TreasureType;

  abstract generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string
  ): DungeonResult;

  deriveStockingList(
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
