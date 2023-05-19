import { TestBed } from '@angular/core/testing';

import { InspireTrickOrTrapService } from './inspire-trick-or-trap.service';

describe('InspireTrickOrTrapService', () => {
  let service: InspireTrickOrTrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspireTrickOrTrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
