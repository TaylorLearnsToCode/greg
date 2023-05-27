import { Component } from '@angular/core';

@Component({
  selector: 'greg-generate-map-hex',
  templateUrl: './generate-map-hex.component.html',
  styleUrls: ['./generate-map-hex.component.scss'],
})
export class GenerateMapHexComponent {
  hexesAcross: number = 6;
  hexesDown: number = 6;

  get columnArray(): [] {
    return [].constructor(this.hexesAcross);
  }
  get rowArray(): [] {
    return [].constructor(this.hexesDown);
  }
}
