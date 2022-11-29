import { Injectable } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import {
  GemOrJewel,
  GemRollResult,
  JewelRollResult,
  RolledGemChances,
  RolledGemValue,
  RolledJewelValues,
  Specie,
  TreasureListEntry,
  TreasureRollResult,
} from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RollTreasureControllerService {
  private areEnteringTreasure: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private rolledTreasureSource: BehaviorSubject<TreasureRollResult> =
    new BehaviorSubject(null);
  private set rolledTreasure(treasure: TreasureRollResult) {
    this.rolledTreasureSource.next(treasure);
  }

  private readonly d6: DiceRolled = new DiceRolled({
    no: 1,
    pips: 6,
  } as DiceRolled);
  private readonly d100: DiceRolled = new DiceRolled({
    no: 1,
    pips: 100,
  } as DiceRolled);

  areEnteringTreasure$: Observable<boolean> =
    this.areEnteringTreasure.asObservable();
  rolledTreasure$: Observable<TreasureRollResult> =
    this.rolledTreasureSource.asObservable();

  constructor() {}

  toggleAreEnteringTreasure(): void {
    this.areEnteringTreasure.next(!this.areEnteringTreasure.value);
  }

  rollTreasure(treasureList: TreasureListEntry): void {
    const rolledTreasure: TreasureRollResult = new TreasureRollResult();
    rolledTreasure.copper = this.rollSpecie(treasureList.copper);
    rolledTreasure.silver = this.rollSpecie(treasureList.silver);
    rolledTreasure.gold = this.rollSpecie(treasureList.gold);
    rolledTreasure.gems = this.rollGems(treasureList.gems);
    rolledTreasure.jewelry = this.rollJewelry(treasureList.jewelry);
    this.rolledTreasure = rolledTreasure;
  }

  private checkForNextLevelGem(key: number): number {
    if (rollDice(this.d6) === 1 && key < 11) {
      key++;
      key = this.checkForNextLevelGem(key);
    }
    return key;
  }

  private rollGem(gem: GemOrJewel): GemRollResult {
    const result: GemRollResult = new GemRollResult();

    if (rollDice(this.d100) > gem.chanceOf) {
      return result;
    }

    const gems: number[] = [];
    let roll: number;
    for (let i = 0; i < rollDice(gem.numberOf); i++) {
      roll = rollDice(this.d100);
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
      gems[i] = this.checkForNextLevelGem(gems[i]);
    }

    gems.forEach((key: number) => result[RolledGemValue.get(key)]++);

    return result;
  }

  private rollGems(gems: GemOrJewel[]): GemRollResult[] {
    const result: GemRollResult[] = [];
    gems.forEach((gem) => result.push(this.rollGem(gem)));
    return result;
  }

  private rollJewelry(jewelry: GemOrJewel[]): JewelRollResult[] {
    const result: JewelRollResult[] = [];
    jewelry.forEach((jewel) => result.push(this.rollJewel(jewel)));
    return result;
  }

  private rollJewel(jewel: GemOrJewel): JewelRollResult {
    const result: JewelRollResult = new JewelRollResult();

    if (rollDice(this.d100) > jewel.chanceOf) {
      return result;
    }

    const jewels: number[] = [];
    let roll: number;
    let valuation: DiceRolled;
    for (let i = 0; i < rollDice(jewel.numberOf); i++) {
      roll = rollDice(this.d100);

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

  private rollSpecie(specie: Specie): number {
    return rollDice(this.d100) <= specie.chanceOf ? rollDice(specie.amount) : 0;
  }
}
