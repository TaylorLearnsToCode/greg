import { TestBed } from '@angular/core/testing';

import { GenerateWwwEncounterService } from './generate-www-encounter.service';

describe('GenerateWwwEncounterService', () => {
  let service: GenerateWwwEncounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateWwwEncounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
