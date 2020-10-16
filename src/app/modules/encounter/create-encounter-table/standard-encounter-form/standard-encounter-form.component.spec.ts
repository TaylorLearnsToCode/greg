import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardEncounterFormComponent } from './standard-encounter-form.component';

describe('StandardEncounterFormComponent', () => {
  let component: StandardEncounterFormComponent;
  let fixture: ComponentFixture<StandardEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardEncounterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardEncounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
