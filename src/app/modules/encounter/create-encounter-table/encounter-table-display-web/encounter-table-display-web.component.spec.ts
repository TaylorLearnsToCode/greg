import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterTableDisplayWebComponent } from './encounter-table-display-web.component';

describe('EncounterTableDisplayWebComponent', () => {
  let component: EncounterTableDisplayWebComponent;
  let fixture: ComponentFixture<EncounterTableDisplayWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterTableDisplayWebComponent ]
    })
    .compileComponents();
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
