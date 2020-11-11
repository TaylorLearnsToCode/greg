import { DiceRolled } from '@shared/model/dice-rolled.model';
import { IRollMapping } from '@shared/model/roll-index-mapping.interface';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { EncounterTableType } from './encounter-table-types.enum';
import { Encounter } from './encounter.model';

export class EncounterTable {
  diceRolled: DiceRolled[];
  encounterRollMapping: IRollMapping[];
  encounters: Array<Encounter | EncounterTable>;
  name: string;
  type: EncounterTableType;

  constructor(encounterTable?: EncounterTable) {
    encounterTable = doesExist(encounterTable)
      ? encounterTable
      : ({} as EncounterTable);
    this.diceRolled = doesExist(encounterTable.diceRolled)
      ? encounterTable.diceRolled.map((dice) => new DiceRolled(dice))
      : [];
    this.encounterRollMapping = doesExist(encounterTable.encounterRollMapping)
      ? encounterTable.encounterRollMapping
      : [];
    this.encounters = doesExist(encounterTable.encounters)
      ? encounterTable.encounters.map((enc) => {
          if (doesExist((enc as Encounter).monsters)) {
            return new Encounter(enc as Encounter);
          } else if (doesExist((enc as EncounterTable).encounters)) {
            return new EncounterTable(enc as EncounterTable);
          } else {
            return enc as any;
          }
        })
      : [];
    this.name = doesExist(encounterTable.name)
      ? encounterTable.name
      : 'Encounter Table';
    this.type = doesExist(encounterTable.type)
      ? encounterTable.type
      : EncounterTableType.UNSPECIFIED;
  }
}
