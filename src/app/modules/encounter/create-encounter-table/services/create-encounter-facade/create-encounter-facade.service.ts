import { Injectable } from '@angular/core';
import { EncounterTable } from '@encounter/create-encounter-table/model/encounter-table.model';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ICreateEncounterViewState } from '../../model/create-encounter-view-state.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateEncounterFacadeService {
  createEncounterViewState$: Observable<ICreateEncounterViewState>;

  private destroySource = new Subject<void>();
  private encounterTableSource = new BehaviorSubject<EncounterTable>(
    new EncounterTable()
  );

  constructor() {}

  destroy(): void {
    this.destroySource.next();
  }

  initialize(): void {
    this.createEncounterViewState$ = combineLatest([
      this.encounterTableSource.asObservable(),
    ]).pipe(
      map(([encounterTable]) => {
        return { encounterTable } as ICreateEncounterViewState;
      }),
      takeUntil(this.destroySource)
    );
  }
}
