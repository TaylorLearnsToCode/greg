import { Component, Input, OnInit } from '@angular/core';
import { Encounter } from '../../model/encounter.model';

/** Presenter component for Encounters intended to be copy/pasteable into a document for print. */
@Component({
  selector: 'greg-encounter-table-display-print',
  templateUrl: './encounter-table-display-print.component.html',
  styleUrls: ['./encounter-table-display-print.component.scss'],
})
export class EncounterTableDisplayPrintComponent implements OnInit {
  /** The list of encounters making up the table to print. */
  @Input() encounters: Encounter[];
  /** Whether this encounter table is rolled in a dungeon (TRUE) or in the wilderness (FALSE) */
  @Input() isDungeon: boolean;
  /** The title  of this encounter table. */
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
