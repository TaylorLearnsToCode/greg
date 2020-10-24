import { DiceRolled } from '../../../../shared/model/dice-rolled.model';
import { Monster } from '../../../../shared/model/monster.model';
import { doesExist } from '../../../../shared/utilities/common-util/common.util';
import {
  formValueToDiceRolled,
  formValueToMonster,
} from '../../../../shared/utilities/conversion-util/conversion.util';
import { EncounterTable } from '../../model/encounter-table.model';
import { Encounter } from '../../model/encounter.model';

/**
 * For a provided value, returns an Encounter instance with its properties.
 * @param  {any} value
 */
export function formValueToEncounter(value: any): Encounter {
  const encounter = new Encounter();
  encounter.lowRoll = doesExist(value.lowRoll)
    ? value.lowRoll
    : encounter.lowRoll;
  encounter.highRoll = doesExist(value.highRoll)
    ? value.highRoll
    : encounter.highRoll;
  encounter.monsters = doesExist(value.monsters)
    ? (value.monsters as Monster[]).map((monster) =>
        formValueToMonster(monster)
      )
    : encounter.monsters;
  return encounter;
}

/**
 * For a provided value, returns an EncounterTable instance with its properties.
 * @param  {any} value
 */
export function formValueToEncounterTable(value: any): EncounterTable {
  const encounterTable = new EncounterTable();
  encounterTable.diceRolled = doesExist(value.diceRolled)
    ? (value.diceRolled as DiceRolled[]).map((diceRolled) =>
        formValueToDiceRolled(diceRolled)
      )
    : encounterTable.diceRolled;
  encounterTable.encounters = doesExist(value.encounters)
    ? value.encounters.map((encounter: Encounter | EncounterTable) =>
        encounter instanceof Encounter
          ? formValueToEncounter(encounter)
          : formValueToEncounterTable(encounter)
      )
    : encounterTable.encounters;
  encounterTable.title = doesExist(value.title)
    ? value.title
    : encounterTable.title;
  encounterTable.type = doesExist(value.type)
    ? value.type
    : encounterTable.type;
  return encounterTable;
}
