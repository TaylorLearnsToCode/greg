import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTreasureResultsComponent } from './display-treasure-results.component';

describe('DisplayTreasureResultsComponent', () => {
  let component: DisplayTreasureResultsComponent;
  let fixture: ComponentFixture<DisplayTreasureResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTreasureResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTreasureResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
