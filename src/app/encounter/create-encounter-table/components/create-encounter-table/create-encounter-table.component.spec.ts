import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../../model/encounter-table.model';
import { Encounter } from '../../model/encounter.model';
import { CreateEncounterFacadeService } from '../../services/create-encounter-facade/create-encounter-facade.service';
import { CreateEncounterTableComponent } from './create-encounter-table.component';

describe('CreateEncounterTableComponent', () => {
  let component: CreateEncounterTableComponent;
  let fixture: ComponentFixture<CreateEncounterTableComponent>;

  const facadeSpy = jasmine.createSpyObj('CreateEncounterFacadeService', [
    'destroy',
    'initialize',
    'handleEncounterTableAction',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEncounterTableComponent],
      providers: [
        {
          provide: CreateEncounterFacadeService,
          useValue: facadeSpy,
        },
      ],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncounterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => resetAllCalls());

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(facadeSpy.initialize).toHaveBeenCalled();
  });

  it('should destroy the facade', () => {
    component.ngOnDestroy();
    expect(facadeSpy.destroy).toHaveBeenCalled();
  });

  it('should delegate encounter table actions', () => {
    const payload = new EncounterTable();
    payload.encounters = [new Encounter(1, 1, [])];
    const action = {
      action: EncounterTableActions.UPDATE_TABLE,
      payload,
    } as IEncounterTableAction;
    component.onEncounterTableAction(action);
    expect(facadeSpy.handleEncounterTableAction).toHaveBeenCalledWith(action);
  });

  /* Utility Functions */
  function resetAllCalls(): void {
    Object.keys(facadeSpy).forEach((key) => {
      if (facadeSpy[key].calls) {
        facadeSpy[key].calls.reset();
      }
    });
  }
});
