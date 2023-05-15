import { TestBed } from '@angular/core/testing';

import { LbbGemsService } from '@generate/services/generate-treasure/generate-lbb-treasure/lbb-gems/lbb-gems.service';

describe('LbbGemsAndJewelsService', () => {
  let service: LbbGemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LbbGemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
