import { TestBed } from '@angular/core/testing';

import { GenerateDungeonService } from './generate-dungeon.service';

describe('GenerateDungeonService', () => {
  let service: GenerateDungeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateDungeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
