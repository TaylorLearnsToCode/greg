import { TestBed } from '@angular/core/testing';

import { InspireSpecialDungeonRoomService } from './inspire-special-dungeon-room.service';

describe('InspireSpecialDungeonRoomService', () => {
  let service: InspireSpecialDungeonRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspireSpecialDungeonRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
