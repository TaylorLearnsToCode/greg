import { Component, Input, OnInit } from '@angular/core';
import { Encounter } from '../model/encounter.model';

/** Presenter component for Encounters intended to be copy/pasteable as a table into HTML for a web site or blog. */
@Component({
  selector: 'greg-encounter-table-display-web',
  templateUrl: './encounter-table-display-web.component.html',
  styleUrls: ['./encounter-table-display-web.component.scss'],
})
export class EncounterTableDisplayWebComponent implements OnInit {
  /** The list of encounters making up the table to print. */
  @Input() encounters: Encounter[];
  /** Whether this encounter table is rolled in a dungeon (TRUE) or in the wilderness (FALSE) */
  @Input() isDungeon: boolean;

  constructor() {}

  ngOnInit(): void {}
}
