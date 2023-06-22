import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateEncounterService } from '@generate/services/generate-encounter/generate-encounter.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isEmpty } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-generate-locations',
  templateUrl: './generate-locations.component.html',
  styleUrls: ['./generate-locations.component.scss'],
})
export class GenerateLocationsComponent implements OnInit {
  classMatrix: Map<BoundedRange, string> = new Map();
  controlForm: FormGroup;
  encounterLists$: Observable<ReferenceEntryTable[]>;
  locationMatrix: Map<BoundedRange, number> = new Map();

  get centerCol(): number {
    return Math.ceil(this.width / 2);
  }
  get centerRow(): number {
    return Math.ceil(this.height / 2);
  }
  get colNos(): number[] {
    return Array<number>(this.width)
      .fill(1)
      .map((element, index) => element + index);
  }
  get hasLocations(): boolean {
    return this.locationMatrix.size > 0;
  }
  get height(): number {
    return this.controlForm.value.height;
  }
  get locationIndices(): number[] {
    return Array<number>(this.locationMatrix.size)
      .fill(0)
      .map((val, idx) => val + idx);
  }
  get rowNos(): number[] {
    return Array<number>(this.height)
      .fill(1)
      .map((element, index) => element + index);
  }
  get encounterTableReference(): string {
    return this.controlForm.value.encounterTable;
  }
  get width(): number {
    return this.controlForm.value.width;
  }

  private readonly d4 = new DiceRolled({ pips: 4 });
  private readonly d6 = new DiceRolled();
  private readonly d8 = new DiceRolled({ pips: 8 });

  constructor(
    private dataService: DataManagerService,
    private encounterService: GenerateEncounterService
  ) {}

  ngOnInit(): void {
    this.buildControlForm();
    this.deriveClassMatrix();
    this.encounterLists$ = this.dataService.dataState$.pipe(
      map((state) => state.monsterEncounterLists)
    );
  }

  generateLocations(): void {
    this.locationMatrix = new Map();
    const sites: number = this.calculateSites(rollDice(this.d8));

    let column: number;
    let distance: number;
    let row: number;
    for (let i = 0; i < sites; i++) {
      column = this.centerCol;
      row = this.centerRow;
      distance = rollDice(this.d4) - 1;
      switch (rollDice(this.d6)) {
        case 1:
          row += distance;
          break;
        case 2:
          row += Math.ceil(distance / 2);
          column += distance;
          break;
        case 3:
          row -= Math.ceil(distance / 2);
          column -= distance;
          break;
        case 4:
          row -= distance;
          break;
        case 5:
          row -= Math.ceil(distance / 2);
          column -= distance;
          break;
        case 6:
          row += Math.ceil(distance / 2);
          column += distance;
          break;
        default:
          break;
      }

      this.incrementLocationMatrix(
        new BoundedRange({ low: column, high: row })
      );
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

  getLocationCoordsAt(index: number): string | void {
    let i: number = 0;
    for (const key of this.locationMatrix.keys()) {
      if (i === index) {
        return `${key.low}, ${key.high}`;
      } else {
        i++;
      }
    }
  }

  getLocationDescriptionAt(index: number): string | void {
    let i: number = 0;
    for (const val of this.locationMatrix.values()) {
      if (i === index) {
        return ''.concat(
          this.deriveLocationScale(val),
          this.deriveEncounterSuggestion()
        );
      } else {
        i++;
      }
    }
    return '';
  }

  private deriveEncounterSuggestion(): string {
    if (!isEmpty(this.encounterTableReference)) {
      const encounter: EncounterResult[] =
        this.encounterService.generateEncounterFromList(
          this.dataService.retrieveReference(
            this.encounterTableReference,
            PERSISTENCE_TYPES.monsterEncounterList
          )
        );
      if (!isEmpty(encounter)) {
        return `: ${encounter[0].name}`;
      }
    }
    return '';
  }

  getTextByCoords(col: number, row: number): string {
    const key: BoundedRange = new BoundedRange({ low: col, high: row });
    for (const [location, entry] of this.locationMatrix.entries()) {
      if (key.equals(location)) {
        return entry.toString();
      }
    }
    return '';
  }

  hasLocationAt(col: number, row: number): boolean {
    const key: BoundedRange = new BoundedRange({ low: col, high: row });
    for (const locationKey of this.locationMatrix.keys()) {
      if (key.equals(locationKey)) {
        return true;
      }
    }
    return false;
  }

  private buildControlForm(): void {
    const formFeeder: any = {};
    formFeeder.height = 9;
    formFeeder.width = 11;
    formFeeder.encounterTable = '';
    this.controlForm = buildFormFromObject(formFeeder) as FormGroup;
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
    }
    return totalCellsHighlighted;
  }

  private calculateSites(roll: number): number {
    let sites: number;
    switch (roll) {
      case 8:
        sites = 3;
        break;
      case 7:
        sites = 2;
        break;
      case 6:
      case 5:
        sites = 1;
        break;
      default:
        sites = 0;
    }
    return sites;
  }

  private deriveClassMatrix(): void {
    this.classMatrix.clear();

    let totalCellsHighlighted: number;
    let cellCount: number;
    for (const colNo of this.colNos) {
      totalCellsHighlighted = this.calculateTotalCellsHighlighted(colNo);
      cellCount = 0;
      for (const rowNo of this.rowNos) {
        cellCount += this.insertMatrixRecord(
          colNo,
          rowNo,
          totalCellsHighlighted,
          cellCount
        );
      }
    }
  }

  private deriveLocationScale(val: number): string {
    switch (val) {
      case 1:
        return 'Small Adventure Site';
      case 2:
        return 'Large or Multi-Level Dungeon';
      case 3:
        return 'Huge or Megadungeon';
      default:
        return '';
    }
  }

  private incrementLocationMatrix(key: BoundedRange): void {
    let updated: boolean = false;
    let value: number | undefined = 1;
    for (const cell of this.locationMatrix.keys()) {
      if (key.equals(cell)) {
        value = this.locationMatrix.get(cell);
        value = value ? value + 1 : 1;
        this.locationMatrix.set(cell, value);
        updated = true;
        break;
      }
    }
    if (!updated) {
      this.locationMatrix.set(key, 1);
    }
  }

  private insertMatrixRecord(
    colNo: number,
    rowNo: number,
    totalCellsHighlighted: number,
    cellCount: number
  ): number {
    const rowRadius = Math.floor(totalCellsHighlighted / 2);

    let retVal = 0;
    if (
      rowRadius >= Math.abs(this.centerRow - rowNo) &&
      cellCount < totalCellsHighlighted
    ) {
      retVal++;
      this.classMatrix.set(
        new BoundedRange({ low: colNo, high: rowNo }),
        'highlight-cell'
      );
    } else {
      this.classMatrix.set(new BoundedRange({ low: colNo, high: rowNo }), '');
    }

    return retVal;
  }
}
