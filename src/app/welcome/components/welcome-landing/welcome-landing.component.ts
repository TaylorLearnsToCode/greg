import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';

@Component({
  selector: 'greg-welcome-landing',
  templateUrl: './welcome-landing.component.html',
  styleUrls: ['./welcome-landing.component.scss'],
})
export class WelcomeLandingComponent {
  readonly pageDisplayMode = PageDisplayMode.SINGLE;
}
