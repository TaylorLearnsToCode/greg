import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEncounterTableComponent } from './create-encounter-table.component';

describe('CreateEncounterTableComponent', () => {
  let component: CreateEncounterTableComponent;
  let fixture: ComponentFixture<CreateEncounterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEncounterTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncounterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
