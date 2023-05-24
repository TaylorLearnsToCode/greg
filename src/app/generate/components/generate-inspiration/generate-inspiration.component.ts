import { Component } from '@angular/core';
import { InspireSpecialDungeonRoomService } from '@generate/services/inspire-special-dungeon-room/inspire-special-dungeon-room.service';
import { InspireTrickOrTrapService } from '@generate/services/inspire-trick-or-trap/inspire-trick-or-trap.service';

@Component({
  selector: 'greg-generate-inspiration',
  templateUrl: './generate-inspiration.component.html',
  styleUrls: ['./generate-inspiration.component.scss'],
})
export class GenerateInspirationComponent {
  result: string = '~';

  constructor(
    private specialService: InspireSpecialDungeonRoomService,
    private trapService: InspireTrickOrTrapService
  ) {}

  clear(): void {
    this.result = '~';
  }

  inspireSpecial(): void {
    this.result = this.specialService.generateSpecialEffect();
  }

  inspireTrap(): void {
    this.result = this.trapService.generateTrickOrTrap();
  }
}
