import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTablePrintComponent } from './display-table-print.component';

describe('DisplayTablePrintComponent', () => {
  let component: DisplayTablePrintComponent;
  let fixture: ComponentFixture<DisplayTablePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTablePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTablePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
