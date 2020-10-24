import { doesExist } from '@shared/utilities/common-util/common.util';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EncounterTable } from './encounter-table.model';

/** Interface contract for elements making up the Create Encounter component's state. */
export interface ICreateEncounterViewState {
  /** The value of the currently defined EncounterTable. */
  encounterTable: EncounterTable;
}

/**
 * Creates and returns a stream of ICreateEncounterViewState objects.
 * If a {destroySource} is provided, will self-terminate when it emits.
 * @param  {Observable<EncounterTable>} encounterTable$
 * @param  {Subject<void>} destroySource?
 */
export function buildCreateEncounterViewState$(
  encounterTable$: Observable<EncounterTable>,
  destroySource?: Subject<void>
): Observable<ICreateEncounterViewState> {
  if (!doesExist(destroySource)) {
    destroySource = new Subject<void>();
  }
  return combineLatest([encounterTable$]).pipe(
    map(([encounterTable]) => {
      return { encounterTable } as ICreateEncounterViewState;
    }),
    takeUntil(destroySource)
  );
}
