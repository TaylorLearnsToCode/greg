import { TestBed } from '@angular/core/testing';

import { EnterTreasureControllerService } from './enter-treasure-controller.service';

describe('EnterTreasureControllerService', () => {
  let service: EnterTreasureControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterTreasureControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
