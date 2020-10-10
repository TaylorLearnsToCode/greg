import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../model/encounter-table.model';
import { Encounter } from '../model/encounter.model';
import { EncounterTableDisplayComponent } from './encounter-table-display.component';

describe('EncounterTableDisplayComponent', () => {
  let component: EncounterTableDisplayComponent;
  let fixture: ComponentFixture<EncounterTableDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncounterTableDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should defer an action export the curret table as a JSON', () => {
    const encounterTableActionSpy = spyOn(
      component.encounterTableAction,
      'emit'
    ).and.callFake(() => {});
    const encounterTable = new EncounterTable(
      [new DiceRolled(1, 6)],
      [new Encounter(1)]
    );
    const expectedPayload: IEncounterTableAction = {
      action: EncounterTableActions.EXPORT_JSON,
      payload: encounterTable,
    } as IEncounterTableAction;
    component.encounterTable = encounterTable;
    component.exportToJson();
    expect(encounterTableActionSpy).toHaveBeenCalledWith(expectedPayload);
  });
});
