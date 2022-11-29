import { DiceRolled } from '@shared/model/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import {
  JewelRollResult,
  RolledJewelValues,
} from '../model/treasure-jewelry.model';
import { GemOrJewel } from '../model/treasure-list-entry.model';

export function rollJewelry(jewelry: GemOrJewel[]): JewelRollResult[] {
  const result: JewelRollResult[] = [];
  jewelry.forEach((jewel) => result.push(rollJewel(jewel)));
  return result;
}

const d100: DiceRolled = new DiceRolled({ pips: 100 } as DiceRolled);
const d6: DiceRolled = new DiceRolled();

function rollJewel(jewel: GemOrJewel): JewelRollResult {
  const result: JewelRollResult = new JewelRollResult();

  if (rollDice(d100) > jewel.chanceOf) {
    return result;
  }

  const jewels: number[] = [];
  let roll: number;
  let valuation: DiceRolled;
  for (let i = 0; i < rollDice(jewel.numberOf); i++) {
    roll = rollDice(d100);

    RolledJewelValues.forEach((value: DiceRolled, key: number) => {
      if (roll <= key) {
        valuation = value;
      }
    });

    jewels.push(rollDice(valuation));
  }

  result.values = jewels;
  return result;
}
