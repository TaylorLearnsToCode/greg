import { TestBed } from '@angular/core/testing';
import { Encounter } from '@encounter/create-encounter-table/model/encounter.model';
import { EncounterRollPipe } from './encounter-roll.pipe';

describe('EncounterRollPipe', () => {
  let pipe: EncounterRollPipe;
  let testEncounter: Encounter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncounterRollPipe],
    });
    pipe = TestBed.inject(EncounterRollPipe);
    testEncounter = null;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "1"', () => {
    testEncounter = new Encounter(1);
    expect(pipe.transform(testEncounter)).toEqual('1');
    testEncounter.highRoll = 1;
    expect(pipe.transform(testEncounter)).toEqual('1');
  });

  it('should return 1-2', () => {
    testEncounter = new Encounter(1, 2);
    expect(pipe.transform(testEncounter)).toEqual('1-2');
  });
});
