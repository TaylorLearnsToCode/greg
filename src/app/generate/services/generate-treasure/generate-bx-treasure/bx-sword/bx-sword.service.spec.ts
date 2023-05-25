import { TestBed } from '@angular/core/testing';

import { BxSwordService } from './bx-sword.service';

describe('BxSwordService', () => {
  let service: BxSwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BxSwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
