import { EncounterResult } from '@generate/model/encounter-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import {
  findIndexMatchingAllKeys,
  isEmpty,
} from '@shared/utilities/common-util/common.util';

export function squashEncounterResults(
  baseResults: EncounterResult[],
  squashedResults: EncounterResult[]
): void {
  let resultIndex: number;
  for (const result of baseResults) {
    resultIndex = findIndexMatchingAllKeys<EncounterResult>(
      result,
      squashedResults,
      ['name']
    );
    if (resultIndex === -1) {
      squashedResults.push(new EncounterResult(result));
    } else {
      squashedResults[resultIndex].quantity += result.quantity;
      squashedResults[resultIndex].treasure.push(...result.treasure);
      if (result.isLair && !squashedResults[resultIndex].isLair) {
        squashedResults[resultIndex].isLair = true;
      }
    }
  }
}

export function squashEncounterTreasure(
  squashedResults: EncounterResult[]
): void {
  let treasureIndex: number;
  for (const result of squashedResults) {
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
}
