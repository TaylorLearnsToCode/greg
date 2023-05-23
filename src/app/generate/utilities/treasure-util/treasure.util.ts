import { ValueablesResult } from '@generate/model/valuables-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

/**
 * For a given valuable, searches a provided valuables collection:
 * * If the item is present _by value_, sums the quantities
 * * Otherwise, adds the item to the array
 *
 * @param  {ValueablesResult} valuable The article to be added
 * @param  {ValueablesResult[]} valuables The collection to which it is being added
 */
export function addOrIncrementValuable(
  valuable: ValueablesResult,
  valuables: ValueablesResult[]
): void {
  const index: number = valuables.findIndex((v) => v.value === valuable.value);
  if (index === -1) {
    valuables.push(valuable);
  } else {
    valuables[index].quantity += valuable.quantity;
  }
}

  /**
  * Returns the quantity of a given TreasureArticle, guaranteed a number, rolled
  * if dice are provided.
  * --@TODO - extract into a utility function? --
  *
  * @param  {TreasureArticle} article
  */
  export function rollArticleQuantity(article: TreasureArticle): number 
  {
    if (!doesExist(article) || !doesExist(article.quantity)) {
      return 1;
    }
    return doesExist((article.quantity as DiceRolled).pips)
      ? rollDice(article.quantity as DiceRolled)
      : (article.quantity as number);
  }
  
