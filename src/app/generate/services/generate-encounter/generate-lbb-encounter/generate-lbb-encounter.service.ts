import { Injectable } from '@angular/core';
import { AbstractEncounterGenerator } from '@generate/model/abstract-encounter-generator.model';
import { EncounterGeneratorService } from '@generate/model/encounter-generator-service.interface';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateLbbTreasureService } from '@generate/services/generate-treasure/generate-lbb-treasure/generate-lbb-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MonsterConsort } from '@shared/model/monster/monster-consort.model';
import { MonsterRetinue } from '@shared/model/monster/monster-retinue.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import {
  doesExist,
  findIndexMatchingAllKeys,
  isBetween,
} from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateLbbEncounterService
  extends AbstractEncounterGenerator
  implements EncounterGeneratorService
{
  constructor(
    private dataService: DataManagerService,
    private treasureService: GenerateLbbTreasureService
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

  private consortHandledAsCustom(consort: MonsterConsort): void {
    this.result.push(
      new EncounterResult({
        name: consort.name,
        quantity: rollDice(consort.quantity),
      } as EncounterResult)
    );
  }

  // Find a way to test this: a guaranteed consort that is a monster type
  private consortHandledAsReference(consort: MonsterConsort): boolean {
    const consortReference: MonsterType = this.dataService.retrieveReference(
      consort.name,
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

  private consortHandledAsTable(consort: MonsterConsort): boolean {
    const tableReference: ReferenceEntryTable =
      this.dataService.retrieveReference(
        consort.name,
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
    const result = new EncounterResult();

    const monster: MonsterType = this.dataService.retrieveReference(
      ref.reference,
      this.PERSISTENCE_TYPES.monsterType
    );

    result.name = monster.name;
    result.quantity = rollDice(monster.quantity);
    result.isLair = rollDice(this.d100) <= monster.pctInLair;

    this.handleTreasure(monster, result);
    this.handleConsorts(monster, result);
    this.handleRetinue(monster, result);

    return result;
  }

  private handleConsorts(monster: MonsterType, result: EncounterResult): void {
    if (monster.consorts) {
      let numberConsorting: number;
      for (const consort of monster.consorts) {
        numberConsorting = Math.floor(result.quantity / consort.every);
        for (let i = 0; i < numberConsorting; i++) {
          if (rollDice(this.d100) <= consort.pctChance) {
            if (!this.consortHandledAsTable(consort)) {
              if (!this.consortHandledAsReference(consort)) {
                this.consortHandledAsCustom(consort);
              }
            }
          }
        }
      }
    }
  }

  private handleRetinue(monster: MonsterType, result: EncounterResult): void {
    if (monster.retinue) {
      let chanceOf: number;
      for (const retinue of monster.retinue) {
        chanceOf =
          Math.floor(result.quantity / retinue.each) * retinue.incChance;
        if (rollDice(this.d100) <= chanceOf) {
          if (!this.retinueHandledAsTable(retinue)) {
            if (!this.retinueHandledAsReference(retinue)) {
              this.retinueHandledAsCustom(retinue);
            }
          }
        }
      }
    }
  }

  private retinueHandledAsTable(retinue: MonsterRetinue): boolean {
    const tableReference: ReferenceEntryTable =
      this.dataService.retrieveReference(
        retinue.name,
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

  private retinueHandledAsReference(retinue: MonsterRetinue): boolean {
    const retinueReference: MonsterType = this.dataService.retrieveReference(
      retinue.name,
      this.PERSISTENCE_TYPES.monsterType
    );
    if (!doesExist(retinueReference)) {
      return false;
    }
    this.result.push(
      this.generateReferenceEncounter(
        new ReferenceEntry({
          chanceOf: new BoundedRange({ low: 1, high: 100 }),
          persistenceType: this.PERSISTENCE_TYPES.monsterType,
          reference: retinueReference.name,
        })
      )
    );
    return true;
  }

  private retinueHandledAsCustom(retinue: MonsterRetinue): void {
    this.result.push(
      new EncounterResult({
        name: retinue.name,
        quantity: rollDice(retinue.quantity),
      })
    );
  }

  private handleTreasure(monster: MonsterType, result: EncounterResult): void {
    if (result.isLair) {
      const type: TreasureType = this.dataService.retrieveReference(
        monster.treasureType,
        this.PERSISTENCE_TYPES.treasureType,
        'type'
      );
      result.treasure.push(
        ...this.treasureService.generateTreasureByTreasureType(type)
      );
    } else if (monster.treasurePerCap) {
      for (let i = 0; i < result.quantity; i++) {
        for (const treasureArticle of monster.treasurePerCap) {
          if (
            rollDice(treasureArticle.diceRolled) <= treasureArticle.chanceOf
          ) {
            result.treasure.push(
              ...this.treasureService.generateTreasureByArticleType(
                treasureArticle
              )
            );
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
    squashedResult.reverse();
    this.result = squashedResult;
  }
}
