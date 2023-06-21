import { Component, OnInit } from '@angular/core';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';

@Component({
  selector: 'greg-generate-locations',
  templateUrl: './generate-locations.component.html',
  styleUrls: ['./generate-locations.component.scss']
})
export class GenerateLocationsComponent implements OnInit {
  classMatrix: Map<BoundedRange, string> = new Map();
  width: number = 11;
  height: number = 9;

  get centerCol(): number {
    return Math.ceil(this.width / 2);
  }
  get centerRow(): number {
    return Math.ceil(this.height / 2);
  }
  get colNos(): number[] {
    return Array<number>(this.width).fill(1).map((element, index) => element + index);
  }
  get rowNos(): number[] {
    return Array<number>(this.height).fill(1).map((element, index) => element + index);
  }

  ngOnInit(): void {
    this.deriveClassMatrix();
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

  private calculateTotalCellsHighlighted(colNo: number): number {
    const stepsFromCenterColumn = Math.abs(this.centerCol - colNo);
    let totalCellsHighlighted: number;
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
    } return totalCellsHighlighted;
  }

  private deriveClassMatrix(): void {
    this.classMatrix.clear();

    let totalCellsHighlighted: number;
    let cellCount: number;
    for (const colNo of this.colNos) {
      totalCellsHighlighted = this.calculateTotalCellsHighlighted(colNo);
      cellCount = 0;
      for (const rowNo of this.rowNos) {
        cellCount += this.insertMatrixRecord(colNo, rowNo, totalCellsHighlighted, cellCount);
      }
    }
  }

  private insertMatrixRecord(colNo: number, rowNo: number, totalCellsHighlighted: number, cellCount: number): number {
    const rowRadius = Math.floor(totalCellsHighlighted / 2);

    let retVal = 0;
    if (
      rowRadius >= Math.abs(this.centerRow - rowNo) &&
      cellCount < totalCellsHighlighted
    ) {
      retVal++;
      this.classMatrix.set(new BoundedRange({ low: colNo, high: rowNo }), 'highlight-cell');
    } else {
      this.classMatrix.set(new BoundedRange({ low: colNo, high: rowNo }), '');
    }

    return retVal;
  }
}
