import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';

/** 404 page for the Encounter Module */
@Component({
  selector: 'greg-encounter-not-found',
  templateUrl: './encounter-not-found.component.html',
  styleUrls: ['./encounter-not-found.component.scss'],
})
export class EncounterNotFoundComponent {
  /** 404 message for page header */
  readonly headerText = 'Page Not Found!';
  /** 404 sub-message for page header */
  readonly headerSubtext =
    'The requested page does not exist or otherwise has not yet been implemented.';
  /** Page Display Mode */
  readonly pageDisplayMode = PageDisplayMode.SINGLE;

  /** EncounterNotFoundComponent Constructor */
  constructor() {}
}
