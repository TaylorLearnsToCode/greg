import { Injectable } from '@angular/core';
import { AbstractEncounterGenerator } from '@generate/model/abstract-encounter-generator.model';
import { EncounterGeneratorService } from '@generate/model/encounter-generator-service.interface';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateLbbTreasureService } from '@generate/services/generate-treasure/generate-lbb-treasure/generate-lbb-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MonsterConsort } from '@shared/model/monster/monster-consort.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { isBetween } from '@shared/utilities/common-util/common.util';
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

  generateEncounterFromList(list: ReferenceEntryTable): EncounterResult[] {
    this.result = [];
    const listRoll: number = rollDice(list.diceToRoll);
    for (let entry of list.entries) {
      if (isBetween(listRoll, entry.chanceOf)) {
        this.result.push(this.generateReferenceEncounter(entry));
      }
    }
    return this.result;
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

    return result;
  }

  private handleConsorts(monster: MonsterType, result: EncounterResult): void {
    if (monster.consorts) {
      let numberConsorting: number;
      for (const consort of monster.consorts) {
        numberConsorting = Math.floor(result.quantity / consort.every);
        for (let i = 0; i < numberConsorting; i++) {
          if (rollDice(this.d100) <= consort.pctChance) {
            if (!this.consortHandledAsTable()) {
              if (!this.consortHandledAsReference()) {
                this.consortHandleAsCustom(consort);
              }
            }
          }
        }
      }
    }
  }

  private consortHandleAsCustom(consort: MonsterConsort): void {
    this.result.push(
      new EncounterResult({
        name: consort.name,
        quantity: rollDice(consort.quantity),
      } as EncounterResult)
    );
  }

  private consortHandledAsReference(): boolean {
    return false;
  }

  private consortHandledAsTable(): boolean {
    return false;
  }

  /*
  Retinue
  const chanceOf = cohort.pctChance * (result.quantity % cohort.every);
  */

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
}
