import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { SharedModule } from '@shared/shared.module';
import { areEqual } from '@shared/utilities/common-util/common.util';
import {
  EncounterTable,
  EncounterTableActions,
} from '../../model/encounter-table.model';
import { Encounter } from '../../model/encounter.model';
import { EncounterTableFormComponent } from './encounter-table-form.component';

@Component({
  template: `
    <div>
      <greg-encounter-table-form
        #encounterTableFormComponent
        [encounterTable]="e"
      ></greg-encounter-table-form>
    </div>
  `,
})
class TestContainerComponent {
  @ViewChild('encounterTableFormComponent') comp: EncounterTableFormComponent;
  e: EncounterTable;
}

describe('EncounterTableFormComponent', () => {
  let component: EncounterTableFormComponent;
  let fixture: ComponentFixture<EncounterTableFormComponent>;

  let container: TestContainerComponent;
  let containerFixture: ComponentFixture<TestContainerComponent>;

  let IDX_ERROR: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncounterTableFormComponent, TestContainerComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    containerFixture = TestBed.createComponent(TestContainerComponent);
    container = containerFixture.componentInstance;
    containerFixture.detectChanges();

    IDX_ERROR = (component as any).INDEX_NUMBER_REQUIRED;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a wilderness encounter, exclusive, for now', () => {
    expect(component.isDungeonEncounter).toBeFalse();
  });

  it('should update the encounter form on changes', () => {
    const d6 = [new DiceRolled(1, 6)];
    const d8 = [new DiceRolled(1, 8)];
    const blankEncounter = [new Encounter(1)];

    container.e = new EncounterTable(d8);
    containerFixture.detectChanges();
    expect(container.comp.encounterTable.diceRolled).toEqual(d8);
    container.e = new EncounterTable(d6);
    containerFixture.detectChanges();
    expect(container.comp.encounterTable.diceRolled).toEqual(d6);
  });

  it('should set the form according to a provided table on changes', () => {
    const diceRolled = [new DiceRolled(1, 3)];
    const orc = new Monster();
    orc.name = 'Orc';
    const goblin = new Monster();
    goblin.name = 'Goblin';
    const encounters = [
      new Encounter(1, 2, [goblin]),
      new Encounter(3, 3, [orc]),
    ];
    const title = 'Orcs and Goblins';
    const encounterTable = new EncounterTable(diceRolled, encounters, title);
    container.e = encounterTable;
    containerFixture.detectChanges();
    expect(areEqual(container.comp.encounterTable, encounterTable)).toBeTrue();
  });

  it('should be able to add a dice pool', () => {
    const formSize: number = component.formDiceRolled.length;
    component.addDieRolled();
    expect(formSize + 1).toEqual(component.formDiceRolled.length);
  });

  it('should be able to add an encounter', () => {
    const encounterSize: number = component.formEncounters.length;
    component.addEncounter();
    expect(encounterSize + 1).toEqual(component.formEncounters.length);
    const firstEncounter = component.formEncounters.controls[0];
    firstEncounter.patchValue({ lowRoll: 2 });
    component.addEncounter(0);
    expect(encounterSize + 2).toEqual(component.formEncounters.length);
    expect(component.formEncounters.controls[0].get('lowRoll').value).toEqual(
      2
    );
  });

  it('should clear the dice rolled form', () => {
    addControls(3, false);
    expect(component.formDiceRolled.length).toBe(3);
    component.clearDiceRolled();
    expect(component.formDiceRolled.length).toBe(0);
  });

  it('should clear the encounter table form', () => {
    addControls(3, true);
    expect(component.formEncounters.length).toBe(3);
    component.clearTableForm();
    expect(component.formEncounters.length).toBe(0);
  });

  it('should be able to remove a dice pool', () => {
    addControls(3, false);
    expect(component.formDiceRolled.length).toBe(3);
    component.removeDieRolled(1);
    expect(component.formDiceRolled.length).toBe(2);
  });

  it('should validate removing dice pools', () => {
    expect(() => component.removeDieRolled(1)).not.toThrowError(IDX_ERROR);
    addControls(3, false);
    expect(() => component.removeDieRolled(null)).toThrowError(IDX_ERROR);
    expect(() => component.removeDieRolled(999)).not.toThrowError(IDX_ERROR);
  });

  it('should be able to remove a target encounter', () => {
    addControls(3, true);
    expect(component.formEncounters.length).toBe(3);
    component.removeEncounter(1);
    expect(component.formEncounters.length).toBe(2);
  });

  it('should validate removing encounters', () => {
    expect(() => component.removeEncounter(1)).not.toThrowError(IDX_ERROR);
    addControls(3, true);
    expect(() => component.removeEncounter(null)).toThrowError(IDX_ERROR);
    expect(() => component.removeEncounter(999)).not.toThrowError();
  });

  it('should delegate updates to the dice pool', () => {
    const spyObj = spyOn(component.encounterTableAction, 'emit');
    component.addDieRolled(new DiceRolled(1, 8));
    const payload = component.formDiceRolled.value;
    component.updateDiceRolled();
    expect(spyObj).toHaveBeenCalledWith({
      action: EncounterTableActions.UPDATE_DICE_ROLLED,
      payload,
    });
  });

  it('should be null-safe when updating the die pool', () => {
    const spyObj = spyOn(component.encounterTableAction, 'emit');
    component.addDieRolled();
    const payload = component.formDiceRolled.value;
    component.updateDiceRolled();
    expect(spyObj).toHaveBeenCalledWith({
      action: EncounterTableActions.UPDATE_DICE_ROLLED,
      payload,
    });
  });

  it('should delegate updates to the encounter form', () => {
    const spyObj = spyOn(component.encounterTableAction, 'emit');
    component.addEncounter();
    const payload = component.encounterTableForm.value;
    component.updateEncounterTable();
    expect(spyObj).toHaveBeenCalledWith({
      action: EncounterTableActions.UPDATE_TABLE,
      payload,
    });
  });

  it('should not emit an empty form', () => {
    const spyObj = spyOn(component.encounterTableAction, 'emit');
    component.updateEncounterTable();
    expect(spyObj).not.toHaveBeenCalled();
  });

  /* Utility Functions */
  function addControls(num: number, encounters: boolean): void {
    for (let i = 0; i < num; i++) {
      encounters ? component.addEncounter() : component.addDieRolled();
    }
  }
});
