import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ICreateEncounterViewState } from '@encounter/create-encounter-table/model/create-encounter-view-state.interface';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '@encounter/create-encounter-table/model/encounter-table.model';
import { Encounter } from '@encounter/create-encounter-table/model/encounter.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { ExportService } from '@shared/services/export/export.service';
import {
  areEqual,
  cloneObject,
} from '@shared/utilities/common-util/common.util';
import { getExportServiceSpy } from '@test/export.service.spy';
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
  const exportServiceSpy = getExportServiceSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ExportService,
          useValue: exportServiceSpy,
        },
      ],
    });
    action = {} as IEncounterTableAction;
    service = TestBed.inject(CreateEncounterFacadeService);
    service.initialize();
    subscription = service.createEncounterViewState$.subscribe({
      next: onNext,
    });
  });

  afterEach(() => {
    Object.keys(exportServiceSpy).forEach((key) => {
      if (exportServiceSpy[key].calls) {
        exportServiceSpy[key].calls.reset();
      }
    });
    state = null;
    subscription.unsubscribe();
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it('should delegate a JSON Export', () => {
    const title = 'File Title';
    const payload = { object: 'to export', title };
    action.action = EncounterTableActions.EXPORT_JSON;
    action.payload = payload;
    expect(exportServiceSpy.exportAsJson).not.toHaveBeenCalled();
    service.handleEncounterTableAction(action);
    expect(exportServiceSpy.exportAsJson).toHaveBeenCalledWith(payload, title);
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
    expect(areEqual(state.encounterTable.encounters, [encounter])).toBeTrue();
  }));

  it('should handle an update to the encounter table', fakeAsync(() => {
    const thisEncounter: Encounter = cloneObject(encounter);
    thisEncounter.monsters.push(new Monster());
    action.action = EncounterTableActions.UPDATE_TABLE;
    action.payload = {
      diceRolled: [d6, d8],
      encounters: [thisEncounter],
    } as EncounterTable;
    expect(state.encounterTable.diceRolled).toEqual([]);
    expect(state.encounterTable.encounters).toEqual([]);
    service.handleEncounterTableAction(action);
    tick();
    expect(areEqual(state.encounterTable.diceRolled, [d6, d8])).toBeTrue();
    expect(
      areEqual(state.encounterTable.encounters, [thisEncounter])
    ).toBeTrue();
  }));

  it('should not handle unsupported actions', () => {
    action.action = ('TACO_SALAD' as any) as EncounterTableActions;
    expect(() => service.handleEncounterTableAction(action)).toThrowError(
      `Unsupported action: TACO_SALAD`
    );
  });

  it('should produce an immutable state', () => {
    expect(() => (state.encounterTable.diceRolled = [d6])).toThrowError();
  });

  /* Utility Functions */
  function onNext(vs: ICreateEncounterViewState): void {
    state = vs;
  }
});
