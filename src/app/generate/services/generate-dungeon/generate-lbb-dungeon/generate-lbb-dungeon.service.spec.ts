import { TestBed } from '@angular/core/testing';

import { GenerateLbbDungeonService } from './generate-lbb-dungeon.service';

describe('GenerateLbbDungeonService', () => {
  let service: GenerateLbbDungeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateLbbDungeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
