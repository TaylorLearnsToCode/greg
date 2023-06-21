import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';

@Component({
  selector: 'greg-generate-locations',
  templateUrl: './generate-locations.component.html',
  styleUrls: ['./generate-locations.component.scss']
})
export class GenerateLocationsComponent implements OnInit, AfterViewInit {
  classMatrix: Map<BoundedRange, string> = new Map();
  width: number = 11;
  height: number = 9;

  get colNos(): number[] {
    return Array<number>(this.width).fill(1).map((element, index) => element + index);
  }
  get rowNos(): number[] {
    return Array<number>(this.height).fill(1).map((element, index) => element + index);
  }

  get centerCol(): number {
    return Math.ceil(this.width / 2);
  }
  get centerRow(): number {
    return Math.ceil(this.height / 2);
  }

  ngOnInit(): void {
    this.deriveClassMatrix();
  }

  ngAfterViewInit(): void {
    console.warn(this.classMatrix);
  }


  deriveClassMatrix(): void {
    this.classMatrix.clear();

    let key: BoundedRange;
    let value: string;
    let stepsFromCenterColumn: number;
    let totalCellsHighlighted: number;
    let cellCount: number;
    let rowRadius: number;
    for (const colNo of this.colNos) {
      stepsFromCenterColumn = Math.abs(this.centerCol - colNo);
      switch (stepsFromCenterColumn) {
        case 0:
        case 1:
        case 2:
        case 3:
          totalCellsHighlighted = 7 - stepsFromCenterColumn;
          break;
        case 4:
          totalCellsHighlighted = 1;
          break;
        default:
          totalCellsHighlighted = 0;
      }

      cellCount = 0;
      for (const rowNo of this.rowNos) {
        key = new BoundedRange({ low: colNo, high: rowNo });

        rowRadius = Math.floor(totalCellsHighlighted / 2);
        if (
          rowRadius >= Math.abs(this.centerRow - rowNo) &&
          cellCount < totalCellsHighlighted
        ) {
          value = 'highlight-cell';
          cellCount++;
        } else {
          value = '';
        }

        this.classMatrix.set(key, value);
      }
    }
  }

  getClassByCoords(col: number, row: number): string[] {
    const returnValue: string[] = [];
    const key = new BoundedRange({ low: col, high: row });
    for (const matrixKey of this.classMatrix.keys()) {
      if (key.equals(matrixKey)) {
        returnValue.push(this.classMatrix.get(matrixKey) as string);
      }
    }
    return returnValue;
  }
}
