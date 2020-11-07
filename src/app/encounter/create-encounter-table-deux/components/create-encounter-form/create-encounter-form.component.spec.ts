import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncounterFormComponent } from './create-encounter-form.component';

describe('CreateEncounterFormComponent', () => {
  let component: CreateEncounterFormComponent;
  let fixture: ComponentFixture<CreateEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEncounterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
