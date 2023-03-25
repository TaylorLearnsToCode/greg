import { Injectable } from '@angular/core';
import { AppComponentViewModel } from '@shared/model/app-component-view.model';
import { IAppState } from '@shared/model/app-state.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  appState$: Observable<IAppState>;

  private appComponentStateSource: BehaviorSubject<AppComponentViewModel>;

  constructor() {
    this.appComponentStateSource = new BehaviorSubject(
      new AppComponentViewModel()
    );
    this.appState$ = combineLatest([
      this.appComponentStateSource.asObservable(),
    ]).pipe(
      map(([appComponentViewModel]) => {
        return { appComponentViewModel } as IAppState;
      })
    );
  }
}
