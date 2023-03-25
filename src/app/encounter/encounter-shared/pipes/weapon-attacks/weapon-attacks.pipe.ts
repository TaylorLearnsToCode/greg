import { Pipe, PipeTransform } from '@angular/core';
import { Weapon } from '@shared/model/weapon.model';
import { DiceRangePipe } from '@shared/pipes/dice-range/dice-range.pipe';

@Pipe({
  name: 'weaponAttacks',
})
export class WeaponAttacksPipe extends DiceRangePipe implements PipeTransform {
  transform(weapons: Weapon[]): string {
    return `${weapons
      .map((weapon) => `${weapon.name} (${super.transform(weapon.damage)})`)
      .join('\n ')
      .trim()}`;
  }
}
