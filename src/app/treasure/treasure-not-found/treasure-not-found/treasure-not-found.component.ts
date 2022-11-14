import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';

/** 404 page for the Treasure Module */
@Component({
  selector: 'greg-treasure-not-found',
  templateUrl: './treasure-not-found.component.html',
  styleUrls: ['./treasure-not-found.component.scss'],
})
export class TreasureNotFoundComponent {
  /** 404 message for page header */
  readonly headerText = 'Page Not Found!';
  /** 404 sub-message for page header */
  readonly headerSubtext =
    'The requested page does not exist or otherwise has not yet been implemented.';
  /** Page Display Mode */
  readonly pageDisplayMode = PageDisplayMode.SINGLE;
}
