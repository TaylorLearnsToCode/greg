import { Component, Input } from '@angular/core';
import { TreasureResult } from '@generate/model/treasure-result.model';

@Component({
  selector: 'greg-display-treasure-results',
  templateUrl: './display-treasure-results.component.html',
  styleUrls: ['./display-treasure-results.component.scss'],
})
export class DisplayTreasureResultsComponent {
  @Input() treasureResults: TreasureResult[] = [];
}
