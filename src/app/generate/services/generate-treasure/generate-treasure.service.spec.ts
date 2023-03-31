import { TestBed } from '@angular/core/testing';

import { GenerateTreasureService } from './generate-treasure.service';

describe('GenerateTreasureService', () => {
  let service: GenerateTreasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateTreasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
