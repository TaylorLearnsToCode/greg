import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEncounterFormComponent } from './edit-encounter-form.component';

describe('EditEncounterFormComponent', () => {
  let component: EditEncounterFormComponent;
  let fixture: ComponentFixture<EditEncounterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEncounterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEncounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
