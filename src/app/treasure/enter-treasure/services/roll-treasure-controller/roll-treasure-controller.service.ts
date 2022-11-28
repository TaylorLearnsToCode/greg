import { Injectable } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import {
  GemOrJewel,
  GemRollResult,
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
    this.rolledTreasure = rolledTreasure;
  }

  private rollGems(gems: GemOrJewel[]): GemRollResult[] {
    const result: GemRollResult[] = [];
    let nextResult: GemRollResult;

    let noOfGems: number;
    for (let gem of gems) {
      nextResult = new GemRollResult();
      noOfGems = rollDice(gem.numberOf);

      let roll: number;
      for (let i = 0; i < noOfGems; i++) {
        roll = rollDice(this.d100);
        if (roll <= 10) {
          nextResult.no10++;
        } else if (roll <= 25) {
          nextResult.no50++;
        } else if (roll <= 75) {
          nextResult.no100++;
        } else if (roll <= 90) {
          nextResult.no500++;
        } else {
          nextResult.no1k++;
        }
      }

      // handle the 1-in-6 higher category

      result.push(nextResult);
    }

    return result;
  }

  private rollSpecie(specie: Specie): number {
    return rollDice(specie.amount);
  }
}
