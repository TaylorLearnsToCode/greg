import { TestBed } from '@angular/core/testing';
import { CreateEncounterTableFacade } from './create-encounter-table.facade';

describe('CreateEncounterTableFacade', () => {
  let service: CreateEncounterTableFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEncounterTableFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
