import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';
import { BoundedRangePipe } from '@shared/pipes/bounded-range/bounded-range.pipe';

/** Renders the attack(s) and damage for human viewing of a provided monster. */
@Pipe({
  name: 'attacksAndDamage',
})
export class AttacksAndDamagePipe
  extends BoundedRangePipe
  implements PipeTransform {
  /**
   * Returns the attack(s) and damage, stringified as "attacks (damage)", where damage
   * is the bounded range of the attack's minimum and maximum potential.
   * @param  {Monster} monster
   */
  transform(monster: Monster): string {
    return `${monster.attacks} (${super.transform(monster.damage)})`;
  }
}
