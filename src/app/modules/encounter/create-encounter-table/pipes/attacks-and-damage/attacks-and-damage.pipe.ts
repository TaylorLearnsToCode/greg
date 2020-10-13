import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Monster } from '@shared/model/monster.model';
import { BoundedRangePipe } from '@shared/pipes/bounded-range/bounded-range.pipe';
import { doesExist } from '@shared/utilities/common-util/common.util';

/** Renders the attack(s) and damage for human viewing of a provided monster. */
@Pipe({
  name: 'attacksAndDamage',
})
export class AttacksAndDamagePipe
  extends BoundedRangePipe
  implements PipeTransform {
  /**
   * AttacksAndDamagePipe Constructor
   * @param  {DomSanitizer} sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  /**
   * Returns the attack(s) and damage, stringified as "attacks (damage)", where damage
   * is the bounded range of each attack's minimum and maximum potential.
   * * If parameter returnHtml is specified as TRUE, returns a SafeHtml object.
   * * If parameter returnHtml is not specified or is specified as FALSE, returns a string object.
   *
   * Note, if a SafeHTML is returned, Angular requires that the HTML be injected to an element
   * via an attribute binding - e.g. <div [innerHTML]="monster | attacksAndDamage: true"></div>
   * @param  {Monster} monster
   * @param  {string} delimiter? Specifies the string value to place between attacks. Default <br />
   * @param  {boolean} returnHtml? Determines whether to return SafeHTML or string
   */
  transform(
    monster: Monster,
    delimiter?: string,
    returnHtml?: boolean
  ): string | SafeHtml {
    delimiter = doesExist(delimiter) ? delimiter : '<br />';

    const returnString: string = monster.attacks
      .map((attack) => `${attack.name} (${super.transform(attack.damage)})`)
      .join(delimiter);

    return returnHtml
      ? this.sanitizer.bypassSecurityTrustHtml(returnString)
      : returnString;
  }
}
