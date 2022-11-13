import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollEncounterComponent } from './roll-encounter.component';

describe('RollEncounterComponent', () => {
  let component: RollEncounterComponent;
  let fixture: ComponentFixture<RollEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollEncounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
