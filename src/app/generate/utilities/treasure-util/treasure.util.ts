import { ValueablesResult } from '@generate/model/valuables-result.model';

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
