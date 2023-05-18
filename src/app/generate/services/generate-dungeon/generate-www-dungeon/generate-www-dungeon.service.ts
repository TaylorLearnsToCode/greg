import { Injectable } from '@angular/core';
import { AbstractDungeonGenerator } from '@generate/model/abstract-dungeon-generator.model';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';
import { DungeonResult } from '@generate/model/dungeon-result.model';

@Injectable({
  providedIn: 'root',
})
export class GenerateWwwDungeonService
  extends AbstractDungeonGenerator
  implements DungeonGeneratorService
{
  constructor() {
    super();
  }

  generateDungeon(
    noRooms: number,
    dungeonLevel?: number,
    stockingListRef?: string
  ): DungeonResult {
    throw new Error('Method not implemented.');
  }
}
