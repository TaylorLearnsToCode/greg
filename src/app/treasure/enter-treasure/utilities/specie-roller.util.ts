import { DiceRolled } from '@shared/model/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import { Specie } from '../model/treasure-list-entry.model';

export function rollSpecie(specie: Specie): number {
  return rollDice(new DiceRolled({ pips: 100 })) <= specie.chanceOf
    ? rollDice(specie.amount)
    : 0;
}
