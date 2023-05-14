import { TestBed } from '@angular/core/testing';

import { GenerateEncounterService } from './generate-encounter.service';

describe('GenerateEncounterService', () => {
  let service: GenerateEncounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateEncounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
