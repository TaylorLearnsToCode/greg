import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Monster } from '@shared/model/monster.model';
import { SharedModule } from '@shared/shared.module';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import {
  EncounterTable,
  EncounterTableTypes,
} from '../model/encounter-table.model';
import { Encounter } from '../model/encounter.model';
import { StandardEncounterFormComponent } from './standard-encounter-form.component';

describe('StandardEncounterFormComponent', () => {
  let component: StandardEncounterFormComponent;
  let fixture: ComponentFixture<StandardEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StandardEncounterFormComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardEncounterFormComponent);
    component = fixture.componentInstance;
    component.parentForm = buildTestTableForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Utility Functions */
  function buildTestTableForm(): FormGroup {
    return buildFormFromObject(
      new EncounterTable(
        [],
        [new Encounter(1, 1, [new Monster()])],
        'Test Encounter Table',
        EncounterTableTypes.STANDARD
      )
    ) as FormGroup;
  }
});
