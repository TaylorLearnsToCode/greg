import { Component, Input } from '@angular/core';
import { DungeonResult } from '@generate/model/dungeon-result.model';

@Component({
  selector: 'greg-display-dungeon-result',
  templateUrl: './display-dungeon-result.component.html',
  styleUrls: ['./display-dungeon-result.component.scss'],
})
export class DisplayDungeonResultComponent {
  @Input() dungeonResult: DungeonResult;
}
