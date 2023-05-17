import { Injectable } from '@angular/core';
import { NAVIGATION_ROUTES } from '@assets/navigation-routes.config';
import { AppComponentViewModel } from '@shared/model/ui/app-component-view.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
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

  setMainHeight(height: string): void {
    const nextState = this.appComponentViewState;
    (nextState.mainStyles as any)['max-height'] = height;
    this.appComponentViewState = nextState;
  }

  toggleCollapse(menuLabel: String): void {
    const nextRoutes = this.appComponentViewState.navRoutes;
    const routeIndex = nextRoutes.findIndex(
      (route) => route.menuLabel === menuLabel
    );
    if (routeIndex != -1) {
      nextRoutes[routeIndex].isExpanded = doesExist(
        nextRoutes[routeIndex].isExpanded
      )
        ? !nextRoutes[routeIndex].isExpanded
        : true;
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
