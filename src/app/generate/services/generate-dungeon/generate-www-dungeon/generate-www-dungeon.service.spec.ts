import { TestBed } from '@angular/core/testing';

import { GenerateWwwDungeonService } from './generate-www-dungeon.service';

describe('GenerateWwwDungeonService', () => {
  let service: GenerateWwwDungeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateWwwDungeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
