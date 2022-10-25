import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';

/** Lander component with ASCII drawing of PHB cover art. */
@Component({
  selector: 'greg-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  /** Page display single content, single column */
  readonly pageDisplayMode = PageDisplayMode.SINGLE;
}
