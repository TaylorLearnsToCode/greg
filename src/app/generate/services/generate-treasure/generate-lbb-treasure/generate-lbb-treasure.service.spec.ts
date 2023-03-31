import { TestBed } from '@angular/core/testing';

import { GenerateLbbTreasureService } from './generate-lbb-treasure.service';

describe('GenerateLbbTreasureService', () => {
  let service: GenerateLbbTreasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateLbbTreasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
