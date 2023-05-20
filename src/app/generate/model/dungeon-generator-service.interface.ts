import { DungeonResult } from './dungeon-result.model';

export interface DungeonGeneratorService {
  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string
  ): DungeonResult;
}
