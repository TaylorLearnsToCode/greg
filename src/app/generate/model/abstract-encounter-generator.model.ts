import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { EncounterResult } from './encounter-result.model';

export abstract class AbstractEncounterGenerator {
  protected readonly d100 = new DiceRolled({ pips: 100 });

  protected readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  protected result: EncounterResult[] = [];
}
