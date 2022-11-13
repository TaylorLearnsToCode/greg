import { TestBed } from '@angular/core/testing';

import { EncounterFromMonsterControllerService } from './encounter-from-monster-controller.service';

describe('EncounterFromMonsterControllerService', () => {
  let service: EncounterFromMonsterControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncounterFromMonsterControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
