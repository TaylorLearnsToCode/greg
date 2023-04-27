import { TestBed } from '@angular/core/testing';

import { LbbSwordService } from './lbb-sword.service';

describe('LbbSwordService', () => {
  let service: LbbSwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LbbSwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
