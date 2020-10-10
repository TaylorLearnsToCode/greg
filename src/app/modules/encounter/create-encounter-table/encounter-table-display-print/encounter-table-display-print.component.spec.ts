import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterTableDisplayPrintComponent } from './encounter-table-display-print.component';

describe('EncounterTableDisplayPrintComponent', () => {
  let component: EncounterTableDisplayPrintComponent;
  let fixture: ComponentFixture<EncounterTableDisplayPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterTableDisplayPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableDisplayPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
