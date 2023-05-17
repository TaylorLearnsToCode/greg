import { Component } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { GenerateDungeonService } from '@generate/services/generate-dungeon/generate-dungeon.service';

@Component({
  selector: 'greg-generate-dungeon',
  templateUrl: './generate-dungeon.component.html',
  styleUrls: ['./generate-dungeon.component.scss'],
})
export class GenerateDungeonComponent {
  noRooms: number = 0;
  system: string = '';
  get supportedSystemKeys(): string[] {
    return Object.keys(SUPPORTED_SYSTEMS);
  }
  supportedSystem(key: string): string {
    return (SUPPORTED_SYSTEMS as any)[key];
  }

  constructor(private dungeonService: GenerateDungeonService) {}

  clearForm(): void {
    alert('Implement this next!');
  }

  generateDungeon(): void {
    alert('Implement this next!');
  }

  updateSystemSelection(event: Event): void {
    this.dungeonService.setSystemSelection(
      (event.target as HTMLSelectElement).value
    );
  }
}
