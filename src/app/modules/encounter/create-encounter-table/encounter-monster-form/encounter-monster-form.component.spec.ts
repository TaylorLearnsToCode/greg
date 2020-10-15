import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Monster } from '@shared/model/monster.model';
import { SaveAs, SaveAsClass } from '@shared/model/save-as.model';
import { areEqual } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Encounter } from '../model/encounter.model';
import { MonsterTacticalMovementPipe } from '../pipes/monster-tactical-movement/monster-tactical-movement.pipe';
import { EncounterMonsterFormComponent } from './encounter-monster-form.component';

describe('EncounterMonsterFormComponent', () => {
  let component: EncounterMonsterFormComponent;
  let encounter: Encounter;
  let fixture: ComponentFixture<EncounterMonsterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EncounterMonsterFormComponent,
        MonsterTacticalMovementPipe,
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterMonsterFormComponent);
    component = fixture.componentInstance;
    encounter = new Encounter(1);
    encounter.monsters = [new Monster()];
    component.encounterFormGroup = buildFormFromObject(encounter) as FormGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to add a monster', () => {
    expect(component.monstersForm.controls.length).toBe(1);
    component.addMonster(0);
    expect(component.monstersForm.controls.length).toBe(2);
  });

  it('should remove a monster', () => {
    const saveAsMU = new SaveAs(SaveAsClass.MU, 2);
    const firstMonster = new Monster();
    firstMonster.name = 'First';
    const secondMonster = new Monster();
    secondMonster.name = 'Second';
    secondMonster.saveAs = saveAsMU;
    component.addMonster(0);
    component.monstersForm.patchValue([firstMonster, secondMonster]);
    expect(component.monstersForm.controls.length).toBe(2);
    expect(
      areEqual(component.monstersForm.controls[1].value, secondMonster)
    ).toBeTrue();
    component.removeMonster(0);
    expect(component.monstersForm.controls.length).toBe(1);
    expect(
      areEqual(component.monstersForm.controls[0].value, secondMonster)
    ).toBeTrue();
  });

  it('should not remove the LAST monster', () => {
    expect(component.monstersForm.controls.length).toBe(1);
    component.removeMonster(0);
    expect(component.monstersForm.controls.length).toBe(1);
  });
});
