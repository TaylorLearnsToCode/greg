import { TestBed } from '@angular/core/testing';

import { AppComponentManagerService } from './app-component-manager.service';

describe('AppComponentManagerService', () => {
  let service: AppComponentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComponentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
