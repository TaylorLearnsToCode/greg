import { Component } from '@angular/core';
import { PageDisplayMode } from '@shared/model/ui/page-display-mode.enum';
import { AppComponentManagerService } from '@shared/services/app-component-manager/app-component-manager.service';

@Component({
  selector: 'greg-welcome-landing',
  templateUrl: './welcome-landing.component.html',
  styleUrls: ['./welcome-landing.component.scss'],
})
export class WelcomeLandingComponent {
  readonly pageDisplayMode = PageDisplayMode.SINGLE;

  constructor(private appComponentService: AppComponentManagerService) {}

  toggleConfig(target: string): void {
    this.appComponentService.toggleCollapse(target);
  }
}
