import { Injectable } from '@angular/core';
import { AbstractEncounterGenerator } from '@generate/model/abstract-encounter-generator.model';
import { EncounterGeneratorService } from '@generate/model/encounter-generator-service.interface';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { GenerateBxTreasureService } from '@generate/services/generate-treasure/generate-bx-treasure/generate-bx-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MonsterConsort } from '@shared/model/monster/monster-consort.model';
import { MonsterRetinue } from '@shared/model/monster/monster-retinue.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import {
  doesExist,
  findIndexMatchingAllKeys,
  isBetween,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateBxEncounterService
  extends AbstractEncounterGenerator
  implements EncounterGeneratorService
{
  constructor(
    private dataService: DataManagerService,
    private treasureService: GenerateBxTreasureService
  ) {
    super();
  }

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
    const consortReference: MonsterType = this.dataService.retrieveReference(
      following.name,
      this.PERSISTENCE_TYPES.monsterType
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
      this.dataService.retrieveReference(
        following.name,
        this.PERSISTENCE_TYPES.monsterEncounterList
      );
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

    const monster: MonsterType = this.dataService.retrieveReference(
      ref.reference,
      this.PERSISTENCE_TYPES.monsterType
    );
    if (doesExist(monster)) {
      result.name = monster.name;
      result.quantity = rollDice(monster.quantity);

      this.handleTreasure(monster, result);
      this.handleConsorts(monster, result);
      this.handleRetinue(monster, result);
    } else {
      const monsterList: ReferenceEntryTable =
        this.dataService.retrieveReference(
          ref.reference,
          this.PERSISTENCE_TYPES.monsterEncounterList
        );
      result = this.generateEncounterFromList(monsterList, true)[0];
    }

    return result;
  }

  private handleConsorts(monster: MonsterType, result: EncounterResult) {
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

  private handleTreasure(monster: MonsterType, result: EncounterResult) {
    result.treasureType = monster.treasureType;
    if (result.isLair && !isEmpty(monster.treasureType)) {
      const type: TreasureType = this.dataService.retrieveReference(
        monster.treasureType,
        this.PERSISTENCE_TYPES.treasureType,
        'type'
      );
      result.treasure.push(
        ...this.treasureService.generateTreasureByTreasureType(type)
      );
    } else if (result.isLair && !isEmpty(monster.treasurePerCap)) {
      for (let i = 0; i < result.quantity; i++) {
        for (const treasureArticle of monster.treasurePerCap as (
          | TreasureArticle
          | TreasureType
        )[]) {
          if (doesExist((treasureArticle as TreasureType).type)) {
            const type: TreasureType = this.dataService.retrieveReference(
              monster.treasureType,
              this.PERSISTENCE_TYPES.treasureType,
              'type'
            );
            result.treasure.push(
              ...this.treasureService.generateTreasureByTreasureType(type)
            );
          } else {
            if (
              rollDice((treasureArticle as TreasureArticle).diceRolled) <=
              (treasureArticle as TreasureArticle).chanceOf
            ) {
              result.treasure.push(
                ...this.treasureService.generateTreasureByArticleType(
                  treasureArticle as TreasureArticle
                )
              );
            }
          }
        }
      }
    }
  }

  private squashResult(): void {
    const squashedResult: EncounterResult[] = [];
    let resultIndex: number;
    for (const result of this.result) {
      resultIndex = findIndexMatchingAllKeys<EncounterResult>(
        result,
        squashedResult,
        ['name']
      );
      if (resultIndex === -1) {
        squashedResult.push(new EncounterResult(result));
      } else {
        squashedResult[resultIndex].quantity += result.quantity;
        squashedResult[resultIndex].treasure.push(...result.treasure);
        if (result.isLair && !squashedResult[resultIndex].isLair) {
          squashedResult[resultIndex].isLair = true;
        }
      }
    }

    let treasureIndex: number;
    for (const result of squashedResult) {
      if (!isEmpty(result.treasure)) {
        const squashedTreasure: TreasureResult[] = [];
        for (const treasure of result.treasure) {
          treasureIndex = findIndexMatchingAllKeys<TreasureResult>(
            treasure,
            squashedTreasure,
            ['name']
          );
          if (treasureIndex === -1) {
            squashedTreasure.push(new TreasureResult(treasure));
          } else {
            squashedTreasure[treasureIndex].quantity += treasure.quantity;
          }
        }
        result.treasure = squashedTreasure;
      }
    }

    squashedResult.reverse();

    this.result = squashedResult;
  }
}
