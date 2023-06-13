import { TestBed } from '@angular/core/testing';

import { GenerateBxEncounterService } from './generate-bx-encounter.service';

describe('GenerateBxEncounterService', () => {
  let service: GenerateBxEncounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateBxEncounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
