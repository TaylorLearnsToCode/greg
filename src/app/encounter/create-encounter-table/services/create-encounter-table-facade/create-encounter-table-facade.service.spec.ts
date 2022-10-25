import { TestBed } from '@angular/core/testing';
import { CreateEncounterTableFacadeService } from '@encounter/create-encounter-table/services/create-encounter-table-facade/create-encounter-table-facade.service';

describe('CreateEncounterTableFacadeService', () => {
  let service: CreateEncounterTableFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEncounterTableFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
