import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';

/**
 * Returns a human readable string for the hit dice, and hit point
 * modifier if applicable, for Monster entries.
 */
@Pipe({
  name: 'combinedHitDice',
})
export class CombinedHitDicePipe implements PipeTransform {
  /**
   * Returns the hit dice of a provided Monster with "+" or "-" hit
   * point modifier, as appropriate.
   * @param  {Monster} monster
   */
  transform(monster: Monster): string {
    return ''.concat(
      monster.hitDice.toString(),
      monster.hitPointModifier && monster.hitPointModifier > 0 ? '+' : '',
      monster.hitPointModifier ? monster.hitPointModifier.toString() : ''
    );
  }
}
