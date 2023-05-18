import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEncounterResultComponent } from './display-encounter-result.component';

describe('DisplayEncounterResultComponent', () => {
  let component: DisplayEncounterResultComponent;
  let fixture: ComponentFixture<DisplayEncounterResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEncounterResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEncounterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
