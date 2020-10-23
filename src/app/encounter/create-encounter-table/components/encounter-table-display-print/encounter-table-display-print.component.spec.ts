import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { EncounterTableDisplayPrintComponent } from './encounter-table-display-print.component';

describe('EncounterTableDisplayPrintComponent', () => {
  let component: EncounterTableDisplayPrintComponent;
  let fixture: ComponentFixture<EncounterTableDisplayPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncounterTableDisplayPrintComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
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
