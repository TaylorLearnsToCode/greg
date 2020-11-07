import { Encounter } from '@encounter/create-encounter-table-deux/model/encounter.model';
import { EncounterTableTypes } from '@encounter/create-encounter-table/model/encounter-table.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { formValueToDiceRolled } from '@shared/utilities/conversion-util/conversion.util';
import { EncounterResultMapping } from './encounter-result-mapping.model';

export class EncounterTable {
  diceRolled: DiceRolled[];
  encounters: Array<Encounter | EncounterTable>;
  name: string;
  resultMapping: Array<EncounterResultMapping>;
  type: EncounterTableTypes;

  constructor(table?: EncounterTable) {
    table = doesExist(table) ? table : ({} as EncounterTable);
    this.diceRolled = doesExist(table.diceRolled)
      ? table.diceRolled.map((die: DiceRolled) => formValueToDiceRolled(die))
      : [];
    this.encounters = doesExist(table.encounters) ? table.encounters : [];
    this.name = doesExist(table.name) ? table.name : 'Encounter Table';
    this.resultMapping = doesExist(table.resultMapping)
      ? table.resultMapping
      : [];
    this.type = doesExist(table.type)
      ? (table.type as EncounterTableTypes)
      : EncounterTableTypes.STANDARD;
  }
}
