import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncounterActionsComponent } from './create-encounter-actions.component';

describe('CreateEncounterActionsComponent', () => {
  let component: CreateEncounterActionsComponent;
  let fixture: ComponentFixture<CreateEncounterActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEncounterActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncounterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
