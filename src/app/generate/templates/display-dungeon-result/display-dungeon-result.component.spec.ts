import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDungeonResultComponent } from './display-dungeon-result.component';

describe('DisplayDungeonResultComponent', () => {
  let component: DisplayDungeonResultComponent;
  let fixture: ComponentFixture<DisplayDungeonResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDungeonResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDungeonResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
