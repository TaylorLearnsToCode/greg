import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';

/** Pipe to print monster movement. */
@Pipe({
  name: 'combinedMovement',
})
export class CombinedMovementPipe implements PipeTransform {
  /**
   * For a provided monster, returns the movement of the monster, overland then tactical.
   * @param  {Monster} monster
   */
  transform(monster: Monster): string {
    return `${monster.movementExploration}' (${monster.movementTactical}')`;
  }
}
