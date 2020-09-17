import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterTableDisplayComponent } from './encounter-table-display.component';

describe('EncounterTableDisplayComponent', () => {
  let component: EncounterTableDisplayComponent;
  let fixture: ComponentFixture<EncounterTableDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterTableDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
