import { Component, Input } from '@angular/core';

@Component({
  selector: 'greg-display-dungeon-room-property',
  templateUrl: './display-dungeon-room-property.component.html',
  styleUrls: ['./display-dungeon-room-property.component.scss'],
})
export class DisplayDungeonRoomPropertyComponent {
  @Input() label: string;
  @Input() value: string;
}
