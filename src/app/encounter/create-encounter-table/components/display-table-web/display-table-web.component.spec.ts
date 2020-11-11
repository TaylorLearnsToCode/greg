import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTableWebComponent } from './display-table-web.component';

describe('DisplayTableWebComponent', () => {
  let component: DisplayTableWebComponent;
  let fixture: ComponentFixture<DisplayTableWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTableWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTableWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
