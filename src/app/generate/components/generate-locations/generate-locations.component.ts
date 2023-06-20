import { Component } from '@angular/core';

@Component({
  selector: 'greg-generate-locations',
  templateUrl: './generate-locations.component.html',
  styleUrls: ['./generate-locations.component.scss']
})
export class GenerateLocationsComponent {
  width: number = 10;
  height: number = 6;

  get colNos(): number[] {
    return Array<number>(this.width).fill(1).map((element, index) => element + index);
  }
  get rowNos(): number[] {
    return Array<number>(this.height).fill(1).map((element, index) => element + index);
  }

}
