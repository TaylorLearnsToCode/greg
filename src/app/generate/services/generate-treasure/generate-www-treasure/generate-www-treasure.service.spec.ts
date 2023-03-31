import { TestBed } from '@angular/core/testing';

import { GenerateWwwTreasureService } from './generate-www-treasure.service';

describe('GenerateWwwTreasureService', () => {
  let service: GenerateWwwTreasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateWwwTreasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
