import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisplayTableWebComponent } from './display-table-web.component';

describe('DisplayTableWebComponent', () => {
  let component: DisplayTableWebComponent;
  let fixture: ComponentFixture<DisplayTableWebComponent>;

  beforeEach(waitForAsync(() => {
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
