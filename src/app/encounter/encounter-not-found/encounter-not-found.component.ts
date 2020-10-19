import { Component } from '@angular/core';

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

  /** EncounterNotFoundComponent Constructor */
  constructor() {}
}
