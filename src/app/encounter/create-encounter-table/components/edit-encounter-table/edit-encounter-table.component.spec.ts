import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEncounterTableComponent } from './edit-encounter-table.component';

describe('EditEncounterTableComponent', () => {
  let component: EditEncounterTableComponent;
  let fixture: ComponentFixture<EditEncounterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEncounterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEncounterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
