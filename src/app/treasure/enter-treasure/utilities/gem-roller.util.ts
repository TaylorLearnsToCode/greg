import { DiceRolled } from '@shared/model/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import {
  GemRollResult,
  RolledGemChances,
  RolledGemValue,
} from '../model/treasure-gems.model';
import { GemOrJewel } from '../model/treasure-list-entry.model';

export function rollGems(gems: GemOrJewel[]): GemRollResult[] {
  const result: GemRollResult[] = [];
  gems.forEach((gem) => result.push(rollGem(gem)));
  return result;
}

const d100: DiceRolled = new DiceRolled({ pips: 100 } as DiceRolled);
const d6: DiceRolled = new DiceRolled();

function checkForNextLevelGem(key: number): number {
  if (rollDice(d6) === 1 && key < 11) {
    key++;
    key = checkForNextLevelGem(key);
  }
  return key;
}

function rollGem(gem: GemOrJewel): GemRollResult {
  const result: GemRollResult = new GemRollResult();

  if (rollDice(d100) > gem.chanceOf) {
    return result;
  }

  const gems: number[] = [];
  let roll: number;
  for (let i = 0; i < rollDice(gem.numberOf); i++) {
    roll = rollDice(d100);
    RolledGemChances.forEach((chance: number, key: number) => {
      if (roll <= chance) {
        gems.push(key);
      }
    });
  }

  let incrementBy: number;
  if (gems.length > 99) {
    incrementBy = 10;
  } else if (gems.length > 9) {
    incrementBy = 5;
  } else {
    incrementBy = 1;
  }

  for (let i = 0; i < gems.length; i += incrementBy) {
    gems[i] = checkForNextLevelGem(gems[i]);
  }

  gems.forEach((key: number) => result[RolledGemValue.get(key)]++);

  return result;
}
