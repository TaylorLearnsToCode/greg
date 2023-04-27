import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentViewModel } from '@shared/model/ui/app-component-view.model';
import { AppComponentManagerService } from '@shared/services/app-component-manager/app-component-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('header') headerRef: ElementRef;
  @ViewChild('nav') navRef: ElementRef;

  appComponentViewState$: Observable<AppComponentViewModel>;
  hasSubtext: boolean;
  mainStyles = { 'max-height': '100vh' };

  constructor(
    private manager: AppComponentManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appComponentViewState$ = this.manager.appComponentViewState$.pipe(
      tap((state) => this.identifySubtext(state))
    );
  }

  ngAfterViewInit(): void {
    this.setMainHeight();
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

  private setMainHeight(): void {
    const headerHeight: number = (this.headerRef.nativeElement as HTMLElement)
      .offsetHeight;
    const navHeight: number = (this.navRef.nativeElement as HTMLElement)
      .offsetHeight;
    this.mainStyles[
      'max-height'
    ] = `calc(100vh - ${headerHeight}px - ${navHeight}px - 8px`;
  }
}
