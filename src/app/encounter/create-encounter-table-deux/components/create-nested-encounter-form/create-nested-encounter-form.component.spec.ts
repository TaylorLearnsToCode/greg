import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNestedEncounterFormComponent } from './create-nested-encounter-form.component';

describe('CreateNestedEncounterFormComponent', () => {
  let component: CreateNestedEncounterFormComponent;
  let fixture: ComponentFixture<CreateNestedEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNestedEncounterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNestedEncounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
