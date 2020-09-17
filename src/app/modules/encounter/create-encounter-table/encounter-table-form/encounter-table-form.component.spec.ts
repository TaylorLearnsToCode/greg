import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterTableFormComponent } from './encounter-table-form.component';

describe('EncounterTableFormComponent', () => {
  let component: EncounterTableFormComponent;
  let fixture: ComponentFixture<EncounterTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
