import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEncounterTableComponent } from './create-encounter-table.component';

describe('CreateEncounterTableComponent', () => {
  let component: CreateEncounterTableComponent;
  let fixture: ComponentFixture<CreateEncounterTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEncounterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncounterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
