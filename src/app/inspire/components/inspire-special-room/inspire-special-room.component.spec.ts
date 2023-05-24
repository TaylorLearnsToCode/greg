import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspireSpecialRoomComponent } from './inspire-special-room.component';

describe('InspireSpecialRoomComponent', () => {
  let component: InspireSpecialRoomComponent;
  let fixture: ComponentFixture<InspireSpecialRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspireSpecialRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspireSpecialRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
