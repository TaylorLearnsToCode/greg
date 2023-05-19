import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDungeonRoomPropertyComponent } from './display-dungeon-room-property.component';

describe('DisplayDungeonRoomPropertyComponent', () => {
  let component: DisplayDungeonRoomPropertyComponent;
  let fixture: ComponentFixture<DisplayDungeonRoomPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDungeonRoomPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDungeonRoomPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
