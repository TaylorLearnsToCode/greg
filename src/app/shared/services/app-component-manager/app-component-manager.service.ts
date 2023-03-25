import { Injectable } from '@angular/core';
import { NAVIGATION_ROUTES } from '@assets/navigation-routes.config';
import { AppComponentViewModel } from '@shared/model/app-component-view.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppComponentManagerService {
  appComponentViewState$: Observable<AppComponentViewModel>;

  private get appComponentViewState(): AppComponentViewModel {
    return new AppComponentViewModel(this.appComponentViewStateSource.value);
  }
  private set appComponentViewState(newState: AppComponentViewModel) {
    this.appComponentViewStateSource.next(newState);
  }
  private appComponentViewStateSource =
    new BehaviorSubject<AppComponentViewModel>(new AppComponentViewModel());

  constructor() {
    this.initializeStateObservable();
    this.initializeNavRoutes();
  }

  toggleCollapse(menuLabel: String): void {
    const nextRoutes = this.appComponentViewState.navRoutes;
    const routeIndex = nextRoutes.findIndex(
      (route) => route.menuLabel === menuLabel
    );
    if (routeIndex != -1) {
    } else {
      throw new Error('');
    }
  }

  private initializeNavRoutes(): void {
    const nextState = this.appComponentViewState;
    nextState.navRoutes.push(...NAVIGATION_ROUTES);
    this.appComponentViewState = nextState;
  }

  private initializeStateObservable(): void {
    this.appComponentViewState$ =
      this.appComponentViewStateSource.asObservable();
  }
}
