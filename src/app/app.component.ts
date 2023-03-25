import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentViewModel } from '@shared/model/app-component-view.model';
import { AppComponentManagerService } from '@shared/services/app-component-manager/app-component-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  appComponentViewState$: Observable<AppComponentViewModel>;
  hasSubtext: boolean;

  constructor(
    private manager: AppComponentManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appComponentViewState$ = this.manager.appComponentViewState$.pipe(
      tap((state) => this.identifySubtext(state))
    );
  }

  navigateTo(routePath: string): void {
    this.router.navigate([routePath]);
  }

  toggleCollapse(menuLabel: string): void {
    this.manager.toggleCollapse(menuLabel);
  }

  private identifySubtext(state: AppComponentViewModel): void {
    this.hasSubtext =
      doesExist(state.headerSubtext) && state.headerSubtext.length != 0;
  }
}
