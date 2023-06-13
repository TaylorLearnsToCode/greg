import { Injectable } from '@angular/core';
import { AbstractEncounterGenerator } from '@generate/model/abstract-encounter-generator.model';
import { EncounterGeneratorService } from '@generate/model/encounter-generator-service.interface';
import { EncounterResult } from '@generate/model/encounter-result.model';
import { GenerateBxTreasureService } from '@generate/services/generate-treasure/generate-bx-treasure/generate-bx-treasure.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { MonsterType } from '@shared/model/monster/monster-type.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist, isEmpty } from '@shared/utilities/common-util/common.util';
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

  handleTreasure(monster: MonsterType, result: EncounterResult) {
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

  populateEncounterResult(result: EncounterResult, monster: MonsterType): void {
    result.name = monster.name;
    result.quantity = rollDice(monster.quantity);
  }

  retrieveEncounterReferenceTable(name: string): ReferenceEntryTable {
    return this.dataService.retrieveReference(
      name,
      this.PERSISTENCE_TYPES.monsterEncounterList
    );
  }

  retrieveMonsterReference(name: string): MonsterType {
    return this.dataService.retrieveReference(
      name,
      this.PERSISTENCE_TYPES.monsterType
    );
  }
}
