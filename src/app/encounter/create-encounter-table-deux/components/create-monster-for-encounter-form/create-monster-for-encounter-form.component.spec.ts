import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonsterForEncounterFormComponent } from './create-monster-for-encounter-form.component';

describe('CreateMonsterForEncounterFormComponent', () => {
  let component: CreateMonsterForEncounterFormComponent;
  let fixture: ComponentFixture<CreateMonsterForEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonsterForEncounterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonsterForEncounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
