import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStandardEncounterFormComponent } from './create-standard-encounter-form.component';

describe('CreateStandardEncounterFormComponent', () => {
  let component: CreateStandardEncounterFormComponent;
  let fixture: ComponentFixture<CreateStandardEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStandardEncounterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStandardEncounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
