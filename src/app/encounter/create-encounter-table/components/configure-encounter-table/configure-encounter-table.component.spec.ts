import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureEncounterTableComponent } from './configure-encounter-table.component';

describe('ConfigureEncounterTableComponent', () => {
  let component: ConfigureEncounterTableComponent;
  let fixture: ComponentFixture<ConfigureEncounterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureEncounterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureEncounterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
