import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMonsterEncounterListComponent } from './configure-monster-encounter-list.component';

describe('ConfigureMonsterEncounterListComponent', () => {
  let component: ConfigureMonsterEncounterListComponent;
  let fixture: ComponentFixture<ConfigureMonsterEncounterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureMonsterEncounterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureMonsterEncounterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
