import { TestBed } from '@angular/core/testing';

import { BxMagicAndScrollService } from './bx-magic-and-scroll.service';

describe('BxMagicAndScrollService', () => {
  let service: BxMagicAndScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BxMagicAndScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
