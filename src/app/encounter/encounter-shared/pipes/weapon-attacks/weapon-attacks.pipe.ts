import { Pipe, PipeTransform } from '@angular/core';
import { Weapon } from '@shared/model/weapon.model';
import { BoundedRangePipe } from '@shared/pipes/bounded-range/bounded-range.pipe';

@Pipe({
  name: 'weaponAttacks',
})
export class WeaponAttacksPipe
  extends BoundedRangePipe
  implements PipeTransform {
  transform(weapons: Weapon[]): string {
    return `${weapons
      .map((weapon) => `${weapon.name} (${super.transform(weapon.damage)})`)
      .join('\n ')
      .trim()}`;
  }
}
