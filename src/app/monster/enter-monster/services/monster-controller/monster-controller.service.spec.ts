import { TestBed } from '@angular/core/testing';

import { MonsterControllerService } from './monster-controller.service';

describe('MonsterControllerService', () => {
  let service: MonsterControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
