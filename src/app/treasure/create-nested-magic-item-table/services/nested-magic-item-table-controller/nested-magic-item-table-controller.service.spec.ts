import { TestBed } from '@angular/core/testing';

import { NestedMagicItemTableControllerService } from './nested-magic-item-table-controller.service';

describe('NestedMagicItemTableControllerService', () => {
  let service: NestedMagicItemTableControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestedMagicItemTableControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
