import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEncounterActionsComponent } from './create-encounter-actions.component';

describe('CreateEncounterActionsComponent', () => {
  let component: CreateEncounterActionsComponent;
  let fixture: ComponentFixture<CreateEncounterActionsComponent>;

  beforeEach(waitForAsync(() => {
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
