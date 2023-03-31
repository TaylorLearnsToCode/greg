import { TestBed } from '@angular/core/testing';

import { GenerateBxTreasureService } from './generate-bx-treasure.service';

describe('GenerateBxTreasureService', () => {
  let service: GenerateBxTreasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateBxTreasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
