import { EncounterTable } from '@encounter/create-encounter-table-deux/model/encounter-table.model';
import { Encounter } from '@encounter/create-encounter-table-deux/model/encounter.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CreateEncounterTableActions } from './create-encounter-table-actions.enum';

export interface ICreateEncounterTableViewState {
  action: CreateEncounterTableActions;
  activeEncounter: Encounter;
  activeEncounterIndex: number;
  activeTable: EncounterTable;
}

export function buildCreateEncounterViewState$(
  action$: Observable<CreateEncounterTableActions>,
  activeEncounter$: Observable<Encounter>,
  activeEncounterIndex$: Observable<number>,
  activeTable$: Observable<EncounterTable>,
  notifier?: Subject<void>
): Observable<ICreateEncounterTableViewState> {
  return combineLatest([
    action$,
    activeEncounter$,
    activeEncounterIndex$,
    activeTable$,
  ]).pipe(
    map(
      ([action, activeEncounter, activeEncounterIndex, activeTable]) =>
        ({
          action,
          activeEncounter,
          activeEncounterIndex,
          activeTable,
        } as ICreateEncounterTableViewState)
    ),
    takeUntil(doesExist(notifier) ? notifier : new Subject<void>())
  );
}
