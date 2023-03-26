import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/ui/page-display-mode.enum';

@Component({
  selector: 'greg-configure-landing',
  templateUrl: './configure-landing.component.html',
  styleUrls: ['./configure-landing.component.scss'],
})
export class ConfigureLandingComponent {
  readonly pageDisplayMode = PageDisplayMode.SINGLE;
}
