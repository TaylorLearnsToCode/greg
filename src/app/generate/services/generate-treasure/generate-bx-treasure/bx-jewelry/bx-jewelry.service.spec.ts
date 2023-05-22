import { TestBed } from '@angular/core/testing';

import { BxJewelryService } from './bx-jewelry.service';

describe('BxJewelleryService', () => {
  let service: BxJewelryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BxJewelryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
