import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ICreateEncounterViewState } from '@encounter/create-encounter-table/model/create-encounter-view-state.interface';
import {
  EncounterTableActions,
  IEncounterTableAction,
} from '@encounter/create-encounter-table/model/encounter-table.model';
import { Encounter } from '@encounter/create-encounter-table/model/encounter.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Subscription } from 'rxjs';
import { CreateEncounterFacadeService } from './create-encounter-facade.service';

describe('CreateEncounterFacadeService', () => {
  let action: IEncounterTableAction;
  let service: CreateEncounterFacadeService;
  let state: ICreateEncounterViewState;
  let subscription: Subscription;

  const d6 = new DiceRolled(null, null);
  const d8 = new DiceRolled(1, 8);
  const encounter = new Encounter(1);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    action = {} as IEncounterTableAction;
    service = TestBed.inject(CreateEncounterFacadeService);
    service.initialize();
    subscription = service.createEncounterViewState$.subscribe({
      next: onNext,
    });
  });

  afterEach(() => {
    state = null;
    subscription.unsubscribe();
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle a dice roll update', fakeAsync(() => {
    action.action = EncounterTableActions.UPDATE_DICE_ROLLED;
    action.payload = [d6, d8];
    expect(state.encounterTable.diceRolled).toEqual([]);
    service.handleEncounterTableAction(action);
    tick();
    expect(state.encounterTable.diceRolled).toEqual([d6, d8]);
  }));

  it('should handle an encounter update', fakeAsync(() => {
    action.action = EncounterTableActions.UPDATE_ENCOUNTERS;
    action.payload = [encounter];
    expect(state.encounterTable.encounters).toEqual([]);
    service.handleEncounterTableAction(action);
    tick();
    expect(state.encounterTable.encounters).toEqual([encounter]);
  }));

  it('should not handle unsupported actions', () => {
    action.action = ('TACO_SALAD' as any) as EncounterTableActions;
    expect(() => service.handleEncounterTableAction(action)).toThrowError(
      `Unsupported action: TACO_SALAD`
    );
  });

  it('should destroy', fakeAsync(() => {
    expect(state.encounterTable.diceRolled).toEqual([]);
    action.action = EncounterTableActions.UPDATE_DICE_ROLLED;
    action.payload = [d6];
    service.handleEncounterTableAction(action);
    tick();
    expect(state.encounterTable.diceRolled).toEqual([d6]);
    service.destroy();
    action.payload = [d6, d8];
    service.handleEncounterTableAction(action);
    tick();
    expect(state.encounterTable.diceRolled).toEqual([d6]);
  }));

  it('should produce an immutable state', () => {
    expect(() => (state.encounterTable.diceRolled = [d6])).toThrowError();
  });

  /* Utility Functions */
  function onNext(vs: ICreateEncounterViewState): void {
    state = vs;
  }
});
