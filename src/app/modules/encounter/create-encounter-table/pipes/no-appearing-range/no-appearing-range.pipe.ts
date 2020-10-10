import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from '@shared/model/monster.model';
import { BoundedRangePipe } from '@shared/pipes/bounded-range/bounded-range.pipe';

/** Renders the Number Appearing for a given monster. */
@Pipe({
  name: 'noAppearingRange',
})
export class NoAppearingRangePipe
  extends BoundedRangePipe
  implements PipeTransform {
  /**
   * For a given Monster, returns the bounded range of said monster's No. Appearing.
   * If {isDungeon} is specified, will use the number appering in a dungeon level.
   * Otherwise, will use the number appearing in the wilderness.
   * @param  {Monster} monster
   * @param  {boolean} isDungeon?
   */
  transform(monster: Monster, isDungeon?: boolean): string {
    return isDungeon
      ? super.transform(monster.noDungeon)
      : super.transform(monster.noWilderness);
  }
}
