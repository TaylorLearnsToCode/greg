import { Pipe, PipeTransform } from '@angular/core';
import { Encounter } from '@encounter/create-encounter-table/model/encounter.model';
import { doesExist } from '@shared/utilities/common-util/common.util';

/** Renders the roll required for a given encounter in an encounter table.  */
@Pipe({
  name: 'encounterRoll',
})
export class EncounterRollPipe implements PipeTransform {
  /**
   * Provided an encounter, prints out the required roll to trigger that encounter.
   * @param  {Encounter} encounter
   */
  transform(encounter: Encounter): string {
    let returnString = '';
    if (
      !doesExist(encounter.highRoll) ||
      encounter.lowRoll === encounter.highRoll
    ) {
      returnString = encounter.lowRoll.toString();
    } else {
      returnString = `${encounter.lowRoll}-${encounter.highRoll}`;
    }
    return returnString;
  }
}
