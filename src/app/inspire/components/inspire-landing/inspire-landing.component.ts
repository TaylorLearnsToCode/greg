import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/ui/page-display-mode.enum';

@Component({
  selector: 'greg-inspire-landing',
  templateUrl: './inspire-landing.component.html',
  styleUrls: ['./inspire-landing.component.scss'],
})
export class InspireLandingComponent {
  pageDisplayMode: PageDisplayMode = PageDisplayMode.SINGLE;
}
