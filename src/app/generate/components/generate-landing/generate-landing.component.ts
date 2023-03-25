import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';

@Component({
  selector: 'greg-generate-landing',
  templateUrl: './generate-landing.component.html',
  styleUrls: ['./generate-landing.component.scss'],
})
export class GenerateLandingComponent {
  readonly pageDisplayMode = PageDisplayMode.SINGLE;
}
