import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMonsterEncounterComponent } from './generate-monster-encounter.component';

describe('GenerateMonsterEncounterComponent', () => {
  let component: GenerateMonsterEncounterComponent;
  let fixture: ComponentFixture<GenerateMonsterEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateMonsterEncounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateMonsterEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
