import { Injectable } from '@angular/core';
import { DungeonGeneratorService } from '@generate/model/dungeon-generator-service.interface';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbDungeonService implements DungeonGeneratorService {
  constructor() {}
}
