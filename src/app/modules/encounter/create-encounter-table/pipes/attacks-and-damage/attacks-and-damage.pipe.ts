import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';
import { getBoundedRange } from '@shared/utilities/dice-roller/dice-roller.util';
@Pipe({
  name: 'attacksAndDamage',
})
export class AttacksAndDamagePipe implements PipeTransform {
  /**
   * @param  {Monster} monster
   */
  transform(monster: Monster): string {
    const boundedRange: number[] = getBoundedRange(monster.damage);
    return `${monster.attacks} (${boundedRange[0]}-${boundedRange[1]})`;
  }
}
