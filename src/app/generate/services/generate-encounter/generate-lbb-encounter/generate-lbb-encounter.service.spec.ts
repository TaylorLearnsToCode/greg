import { TestBed } from '@angular/core/testing';

import { GenerateLbbEncounterService } from './generate-lbb-encounter.service';

describe('GenerateLbbEncounterService', () => {
  let service: GenerateLbbEncounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateLbbEncounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
