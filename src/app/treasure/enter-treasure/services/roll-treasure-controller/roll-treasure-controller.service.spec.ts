import { TestBed } from '@angular/core/testing';

import { RollTreasureControllerService } from './roll-treasure-controller.service';

describe('RollTreasureControllerService', () => {
  let service: RollTreasureControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollTreasureControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
