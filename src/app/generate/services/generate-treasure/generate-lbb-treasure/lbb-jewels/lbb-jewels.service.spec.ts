import { TestBed } from '@angular/core/testing';

import { LbbJewelsService } from './lbb-jewels.service';

describe('LbbJewelsService', () => {
  let service: LbbJewelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LbbJewelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
