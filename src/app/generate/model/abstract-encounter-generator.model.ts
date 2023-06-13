import { PERSISTENCE_TYPES } from '@assets/app-configs/persistence-types.config';
import {
  squashEncounterResults,
  squashEncounterTreasure,
} from '@generate/utilities/encounter-util/encounter.util';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MonsterConsort } from '@shared/model/monster/monster-consort.model';
import { MonsterRetinue } from '@shared/model/monster/monster-retinue.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import {
  doesExist,
  isBetween,
} from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { EncounterResult } from './encounter-result.model';

export abstract class AbstractEncounterGenerator {
  protected readonly d100 = new DiceRolled({ pips: 100 });
  protected readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  protected result: EncounterResult[] = [];

  abstract handleTreasure(monster: MonsterType, result: EncounterResult): void;
  abstract populateEncounterResult(
    result: EncounterResult,
    monster: MonsterType
  ): void;
  abstract retrieveEncounterReferenceTable(name: string): ReferenceEntryTable;
  abstract retrieveMonsterReference(name: string): MonsterType;

  generateEncounterFromList(
    list: ReferenceEntryTable,
    noSquash?: boolean
  ): EncounterResult[] {
    this.result = [];
    const listRoll: number = rollDice(list.diceToRoll);
    for (let entry of list.entries) {
      if (isBetween(listRoll, entry.chanceOf)) {
        this.result.push(this.generateReferenceEncounter(entry));
      }
    }
    if (!noSquash) {
      this.squashResult();
    }
    return this.result;
  }

  private followingHandledAsCustom(
    following: MonsterConsort | MonsterRetinue
  ): void {
    this.result.push(
      new EncounterResult({
        name: following.name,
        quantity: rollDice(following.quantity),
      } as EncounterResult)
    );
  }

  private followingHandledAsReference(
    following: MonsterConsort | MonsterRetinue
  ): boolean {
    const consortReference: MonsterType = this.retrieveMonsterReference(
      following.name
    );
    if (!doesExist(consortReference)) {
      return false;
    }
    this.result.push(
      this.generateReferenceEncounter(
        new ReferenceEntry({
          chanceOf: new BoundedRange({ low: 1, high: 100 }),
          persistenceType: this.PERSISTENCE_TYPES.monsterType,
          reference: consortReference.name,
        })
      )
    );
    return true;
  }

  private followingHandledAsTable(
    following: MonsterConsort | MonsterRetinue
  ): boolean {
    const tableReference: ReferenceEntryTable =
      this.retrieveEncounterReferenceTable(following.name);
    if (!doesExist(tableReference)) {
      return false;
    }
    const currentResult: EncounterResult[] = this.result;
    currentResult.push(...this.generateEncounterFromList(tableReference, true));
    this.result = currentResult;
    return true;
  }

  private generateReferenceEncounter(ref: ReferenceEntry): EncounterResult {
    let result = new EncounterResult();

    const monster: MonsterType = this.retrieveMonsterReference(ref.reference);
    if (doesExist(monster)) {
      this.populateEncounterResult(result, monster);
      this.handleTreasure(monster, result);
      this.handleConsorts(monster, result);
      this.handleRetinue(monster, result);
    } else {
      const monsterList: ReferenceEntryTable =
        this.retrieveEncounterReferenceTable(ref.reference);
      result = this.generateEncounterFromList(monsterList, true)[0];
    }

    return result;
  }

  private handleConsorts(monster: MonsterType, result: EncounterResult): void {
    if (monster.consorts) {
      let numberConsorting: number;
      for (const consort of monster.consorts) {
        if (consort.every === 0) {
          numberConsorting = 1;
        } else {
          numberConsorting = Math.floor(result.quantity / consort.every);
        }
        for (let i = 0; i < numberConsorting; i++) {
          if (rollDice(this.d100) <= consort.pctChance) {
            if (!this.followingHandledAsTable(consort)) {
              if (!this.followingHandledAsReference(consort)) {
                this.followingHandledAsCustom(consort);
              }
            }
          }
        }
      }
    }
  }

  private handleRetinue(monster: MonsterType, result: EncounterResult) {
    if (monster.retinue) {
      let chanceOf: number;
      for (const retinue of monster.retinue) {
        chanceOf =
          Math.floor(result.quantity / retinue.each) * retinue.incChance;
        if (rollDice(this.d100) <= chanceOf) {
          if (!this.followingHandledAsTable(retinue)) {
            if (!this.followingHandledAsReference(retinue)) {
              this.followingHandledAsCustom(retinue);
            }
          }
        }
      }
    }
  }

  private squashResult(): void {
    const squashedResult: EncounterResult[] = [];
    squashEncounterResults(this.result, squashedResult);
    squashEncounterTreasure(squashedResult);
    squashedResult.reverse();
    this.result = squashedResult;
  }
}
