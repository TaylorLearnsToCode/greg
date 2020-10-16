import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { EncounterTableDisplayWebComponent } from './encounter-table-display-web.component';

describe('EncounterTableDisplayWebComponent', () => {
  let component: EncounterTableDisplayWebComponent;
  let fixture: ComponentFixture<EncounterTableDisplayWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncounterTableDisplayWebComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableDisplayWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
