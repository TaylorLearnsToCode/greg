import { TestBed } from '@angular/core/testing';

import { CreateEncounterFacadeService } from './create-encounter-facade.service';

describe('CreateEncounterFacadeService', () => {
  let service: CreateEncounterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEncounterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
