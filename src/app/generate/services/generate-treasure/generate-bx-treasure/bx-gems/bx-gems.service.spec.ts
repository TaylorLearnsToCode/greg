import { TestBed } from '@angular/core/testing';

import { BxGemsService } from './bx-gems.service';

describe('BxGemsService', () => {
  let service: BxGemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BxGemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
