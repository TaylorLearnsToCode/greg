import { Component, Input, OnInit } from '@angular/core';
import { EncounterTable } from '../model/encounter-table.model';

@Component({
  selector: 'greg-encounter-table-display',
  templateUrl: './encounter-table-display.component.html',
  styleUrls: ['./encounter-table-display.component.scss'],
})
export class EncounterTableDisplayComponent implements OnInit {
  @Input() encounterTable: EncounterTable;

  constructor() {}

  ngOnInit(): void {}
}
