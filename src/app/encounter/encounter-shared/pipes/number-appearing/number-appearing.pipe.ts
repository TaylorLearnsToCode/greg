import { Pipe, PipeTransform } from '@angular/core';
import { EncounterLocation } from '@encounter/encounter-shared/model/encounter-locationS.enum';
import { Monster } from '@shared/model/monster.model';
import { DiceRangePipe } from '@shared/pipes/dice-range/dice-range.pipe';

@Pipe({
  name: 'numberAppearing',
})
export class NumberAppearingPipe
  extends DiceRangePipe
  implements PipeTransform
{
  transform(monster: Monster, encounterLocation: EncounterLocation): string {
    return super.transform(
      encounterLocation == EncounterLocation.WILDERNESS
        ? monster.noWilderness
        : monster.noDungeon
    );
  }
}
