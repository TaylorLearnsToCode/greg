import { TestBed } from '@angular/core/testing';

import { MapOrMagicControllerServiceService } from './map-or-magic-controller-service.service';

describe('MapOrMagicControllerServiceService', () => {
  let service: MapOrMagicControllerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapOrMagicControllerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
