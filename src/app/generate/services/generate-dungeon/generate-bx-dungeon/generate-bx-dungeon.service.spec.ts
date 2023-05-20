import { TestBed } from '@angular/core/testing';

import { GenerateBxDungeonService } from './generate-bx-dungeon.service';

describe('GenerateBxDungeonService', () => {
  let service: GenerateBxDungeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateBxDungeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
