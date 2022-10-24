import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';

@Pipe({
  name: 'hitDice',
})
export class HitDicePipe implements PipeTransform {
  transform(monster: Monster): string {
    return ''.concat(
      monster.hitDice.toString(),
      this.plusMinus(monster.hitPointModifier)
    );
  }

  private plusMinus(hitPointModifier: number): string {
    if (hitPointModifier === 0) {
      return '';
    } else if (hitPointModifier > 0) {
      return `+${hitPointModifier}`;
    } else {
      return `${hitPointModifier}`;
    }
  }
}
