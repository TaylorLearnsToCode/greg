import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';
import { getBoundedRange } from '@shared/utilities/dice-roller/dice-roller.util';

/** Renders the Number Appearing for a given monster. */
@Pipe({
  name: 'noAppearingRange',
})
export class NoAppearingRangePipe implements PipeTransform {
  /**
   * For a given Monster, returns the bounded range of said monster's No. Appearing.
   * If {isDungeon} is specified, will use the number appering in a dungeon level.
   * Otherwise, will use the number appearing in the wilderness.
   * @param  {Monster} monster
   * @param  {boolean} isDungeon?
   */
  transform(monster: Monster, isDungeon?: boolean): string {
    const boundedRange: number[] = isDungeon
      ? getBoundedRange(monster.noDungeon)
      : getBoundedRange(monster.noWilderness);
    return boundedRange.length === 2
      ? `${boundedRange[0]}-${boundedRange[1]}`
      : '';
  }
}
