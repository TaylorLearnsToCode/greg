import { Component, Input } from '@angular/core';
import { EncounterResult } from '@generate/model/encounter-result.model';

@Component({
  selector: 'greg-display-encounter-result',
  templateUrl: './display-encounter-result.component.html',
  styleUrls: ['./display-encounter-result.component.scss'],
})
export class DisplayEncounterResultComponent {
  @Input() encounterResults: EncounterResult[] = [];
  @Input() suppressBottomMargin: boolean;
  @Input() suppressLair: boolean;

  get divClasses(): string[] {
    return this.suppressBottomMargin ? [] : ['spaced-out'];
  }
}
