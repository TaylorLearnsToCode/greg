import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { WeaponPowerTable } from '@shared/model/treasure/weapon-power-table.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import {
  doesExist,
  isBetween,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { rollDice } from '@shared/utilities/dice-util/dice.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';

enum Alignment {
  LAW,
  NEUTRALITY,
  CHAOS,
}

/** Handles the fine details of determining a magic sword's extra characteristics using the LBB ruleset. */
@Injectable({
  providedIn: 'root',
})
export class LbbSwordService {
  /* Dice */
  private readonly d12 = new DiceRolled({ pips: 12 });
  private readonly d100 = new DiceRolled({ pips: 100 });

  /** Alignment map for swords */
  private readonly SWORD_ALIGNMENTS: Map<BoundedRange, Alignment> = new Map([
    [new BoundedRange({ low: 1, high: 65 }), Alignment.LAW],
    [new BoundedRange({ low: 66, high: 90 }), Alignment.NEUTRALITY],
    [new BoundedRange({ low: 91, high: 100 }), Alignment.CHAOS],
  ]);

  /** Modes by which magic swords communicate */
  private readonly SWORD_COMMUNICATION_MODES: Map<BoundedRange, string> =
    new Map([
      [new BoundedRange({ low: 1, high: 6 }), 'None'],
      [new BoundedRange({ low: 7, high: 9 }), 'Empathy'],
      [new BoundedRange({ low: 10, high: 11 }), 'Speech'],
      [new BoundedRange({ low: 12, high: 12 }), 'Telepathy'],
    ]);

  /** Range to determine how many languages, in addition to Alignment, a sword will know */
  private readonly SWORD_LANGUAGES_KNOWN: Map<BoundedRange, number> = new Map([
    [new BoundedRange({ low: 0, high: 0 }), 0],
    [new BoundedRange({ low: 1, high: 50 }), 1],
    [new BoundedRange({ low: 51, high: 70 }), 2],
    [new BoundedRange({ low: 71, high: 85 }), 3],
    [new BoundedRange({ low: 86, high: 95 }), 4],
    [new BoundedRange({ low: 96, high: 99 }), 5],
  ]);
  /** Special purposes for which a sword might have been forged */
  private readonly SWORD_SPECIAL_PURPOSES: string[] = [
    'Slay Magic-Users',
    'Slay Fighting-Men',
    'Defeat Law',
    'Slay Clerics',
    'Slay Monsters',
    'Defeat Chaos',
  ];

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  private swordAlignment: Alignment;
  private swordIntelligence: number;
  private isSpecialPurpose: boolean;

  constructor(private dataService: DataManagerService) {}

  /**
   * If a provided string name contains the text "Sword" - case sensitive - will generate
   * and append in (parentheses) intelligent qualities for the sword, returning the
   * combined result.
   *
   * @param  {string} name
   */
  appendSwordCharacteristics(name: string): string {
    let newName: string = name;

    if (newName.includes('Sword') && !newName.includes('Map to')) {
      this.isSpecialPurpose = rollDice(this.d100) > 90;
      this.swordIntelligence = this.isSpecialPurpose ? 12 : rollDice(this.d12);

      newName += ''.concat(
        this.appendAlignment(),
        this.appendSpecialPurpose(),
        this.appendIntelligence(),
        this.appendEgoism(),
        this.appendCommunicationMode(),
        this.appendLanguages(),
        this.appendPowers(),
        ')'
      );
    }

    return newName;
  }

  /** Generates and returns the sword's alignment. All swords have an alignment. */
  private appendAlignment(): string {
    let alignment: string = '';
    const roll: number = rollDice(this.d100);
    for (const swordAlignment of this.SWORD_ALIGNMENTS.keys()) {
      if (isBetween(roll, swordAlignment)) {
        this.swordAlignment = this.SWORD_ALIGNMENTS.get(
          swordAlignment
        ) as Alignment;
        switch (this.SWORD_ALIGNMENTS.get(swordAlignment)) {
          case Alignment.LAW:
            alignment = 'Lawful';
            break;
          case Alignment.NEUTRALITY:
            alignment = 'Neutral';
            break;
          case Alignment.CHAOS:
            alignment = 'Chaotic';
            break;
          default:
            throwError(
              `Unsupported alignment ${this.SWORD_ALIGNMENTS.get(
                swordAlignment
              )?.toString()} encountered`
            );
        }
        break;
      }
    }
    return isEmpty(alignment) ? '' : ` (Alignment: ${alignment}`;
  }

  /** Determines the way a sword communicates and returns a string indicating as such */
  private appendCommunicationMode(): string {
    let communicationMode: string = '';
    if (this.swordIntelligence > 6) {
      for (const mode of this.SWORD_COMMUNICATION_MODES.keys()) {
        if (isBetween(this.swordIntelligence, mode)) {
          communicationMode = this.SWORD_COMMUNICATION_MODES.get(
            mode
          ) as string;
          break;
        }
      }
    }
    return isEmpty(communicationMode)
      ? ''
      : `; Communication Mode: ${communicationMode}`;
  }

  /**
   * Generates a sword's ego rating and returns a string indicating as such, provided that the ego
   * generated is sufficiently to matter.
   */
  private appendEgoism(): string {
    let ego: string = '';
    if (this.isSpecialPurpose) {
      ego = '12';
    } else if (this.swordIntelligence > 6) {
      ego = rollDice(this.d12).toString();
    }
    return isEmpty(ego) ? '' : `; Egoism: ${ego}`;
  }

  /** If the intelligence of a sword is sufficient to matter, returns a string indicating it */
  private appendIntelligence(): string {
    return this.swordIntelligence > 6
      ? `; Intelligence: ${this.swordIntelligence}`
      : '';
  }

  /**
   * Generates the number of languages a sword should know and returns a string
   * indicating as such.
   */
  private appendLanguages(): string {
    if (this.swordIntelligence < 10) {
      return '';
    }
    let noLanguages = this.determineSwordLanguages();
    if (noLanguages === -1) {
      noLanguages++;
      for (let i = 0; i < 2; i++) {
        noLanguages += this.determineSwordLanguages(
          new DiceRolled({ pips: 100, modifier: -1 })
        );
      }
    }
    return `; Languages Spoken: ${noLanguages}`;
  }

  /**
   * Based on provided intelligence, returns a joined list of special sword powers.
   */
  private appendPowers(): string {
    const powers: string[] = [];

    const primaryPowers: WeaponPowerTable =
      this.dataService.retrieveReference<WeaponPowerTable>(
        'Primary Powers',
        this.PERSISTENCE_TYPES.magicWeaponPowerTable
      );
    const extraordinaryPowers: WeaponPowerTable =
      this.dataService.retrieveReference<WeaponPowerTable>(
        'Extraordinary Ability Table',
        this.PERSISTENCE_TYPES.magicWeaponPowerTable
      );

    let noPowers: number = 0;
    switch (this.swordIntelligence) {
      case 12:
        noPowers = 3;
        powers.push(...this.rollOnWeaponPowerTable(extraordinaryPowers));
        break;
      case 11:
        noPowers = 3;
        powers.push('Read Magic');
        break;
      case 10:
        noPowers = 3;
        break;
      case 9:
        noPowers = 3;
        break;
      case 8:
        noPowers = 2;
        break;
      case 7:
        noPowers = 1;
        break;
      default:
        break;
    }
    powers.push(...this.rollOnWeaponPowerTable(primaryPowers, noPowers));

    return powers.length ? `; Special Powers: ${powers.join(', ')}` : '';
  }

  /**
   * For swords deemed special purpose, generates that special purpose based on alignment
   * and returns a string indicating as such.
   */
  private appendSpecialPurpose(): string {
    if (this.isSpecialPurpose) {
      const specialPurpose: string =
        this.SWORD_SPECIAL_PURPOSES[
          rollDice(
            new DiceRolled({
              pips: this.SWORD_SPECIAL_PURPOSES.length,
              modifier: -1,
            })
          )
        ];

      let specialAbility: string = '';
      switch (this.swordAlignment) {
        case Alignment.LAW:
          specialAbility = 'Paralyze Chaotic Opponents';
          break;
        case Alignment.NEUTRALITY:
          specialAbility = '+1 to All Saving Throws';
          break;
        case Alignment.CHAOS:
          specialAbility = 'Disintegrate Lawful Opponents';
          break;
        default:
          throwError(
            `Unsupported alignment ${this.swordAlignment} encountered`
          );
      }

      return `; Special Purpose: ${specialPurpose} (${specialAbility})`;
    }
    return '';
  }

  /**
   * Rolls a number of languages, as configured, for a sword to know.
   * Returns -1 if no number is found to correspond with the die roll.
   *
   * @param  {DiceRolled} die Optional - default 1d%
   */
  private determineSwordLanguages(die?: DiceRolled): number {
    const roll: number = rollDice(die ? die : this.d100);
    let languages: number = -1;
    for (const no of this.SWORD_LANGUAGES_KNOWN.keys()) {
      if (isBetween(roll, no)) {
        languages = this.SWORD_LANGUAGES_KNOWN.get(no) as number;
        break;
      }
    }
    return languages;
  }

  /**
   * Rolls on a provided WeaponPowerTable a provided number of times, returning a collection
   * of the references generated in the process.
   *
   * @param  {WeaponPowerTable} table
   * @param  {number} times Optional - default 1
   */
  private rollOnWeaponPowerTable(
    table: WeaponPowerTable,
    times?: number
  ): string[] {
    times = doesExist(times) ? times : 1;
    const response: string[] = [];

    let roll: number;
    for (let i = 0; i < (times as number); i++) {
      roll = rollDice(table.diceToRoll);
      for (const entry of table.entries) {
        if (isBetween(roll, entry.chanceOf)) {
          switch (entry.persistenceType) {
            case this.PERSISTENCE_TYPES.magicWeaponPower:
              response.push(entry.reference);
              break;
            case this.PERSISTENCE_TYPES.magicWeaponPowerTable:
              response.push(
                ...this.rollOnWeaponPowerTable(
                  this.dataService.retrieveReference<WeaponPowerTable>(
                    entry.reference,
                    entry.persistenceType
                  )
                )
              );
              break;
            default:
              throwError(
                `Unsupported persistence type ${entry.persistenceType} encountered`
              );
          }
        }
      }
    }

    return response;
  }
}
