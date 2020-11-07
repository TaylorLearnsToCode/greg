import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts a provided Exploration movement into a Tactical (or Combat) movement.
 * Necessary due to string interpolators not recognizing the Math inbuilt class.
 */
@Pipe({
  name: 'monsterTacticalMovement',
})
export class MonsterTacticalMovementPipe implements PipeTransform {
  /**
   * Returns the provided {movement} over three, rounding down to the nearest integer.
   * @param  {number} movement
   */
  transform(movement: number): string {
    return Math.floor(movement / 3).toString();
  }
}
