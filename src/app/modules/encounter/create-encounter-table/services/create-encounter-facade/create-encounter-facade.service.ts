import { Injectable } from '@angular/core';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '@encounter/create-encounter-table/model/encounter-table.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import {
  cloneObject,
  deepFreeze,
} from '@shared/utilities/common-util/common.util';
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
  private get encounterTable(): EncounterTable {
    return cloneObject(this.encounterTableSource.value);
  }
  private set encounterTable(encounterTable: EncounterTable) {
    deepFreeze(encounterTable);
    this.encounterTableSource.next(encounterTable);
  }

  constructor() {}

  destroy(): void {
    this.destroySource.next();
  }

  handleEncounterTableAction(action: IEncounterTableAction): void {
    switch (action.action) {
      case EncounterTableActions.UPDATE_DICE_ROLLED: {
        this.updateDiceRolled(action.payload);
        break;
      }
      default: {
        throw new Error(`Unsupported action: ${action.action}`);
      }
    }
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

  private updateDiceRolled(diceRolled: DiceRolled[]): void {
    const nextEncounterTable = this.encounterTable;
    nextEncounterTable.diceRolled = diceRolled;
    this.encounterTable = nextEncounterTable;
  }
}
