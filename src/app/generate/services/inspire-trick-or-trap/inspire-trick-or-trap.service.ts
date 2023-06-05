import { Injectable } from '@angular/core';
import { AbstractInspirationService } from '@generate/model/abstract-inspiration-service.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { DiceRolled } from '@shared/model/utility/dice-rolled.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class InspireTrickOrTrapService extends AbstractInspirationService {
  private readonly d8 = new DiceRolled({ pips: 8 });
  /** What kind of trap or trick it is */
  private readonly TYPE = new Map<BoundedRange, string>([
    [
      new BoundedRange({ low: 1, high: 1 }),
      'whole room trap (poison gas, closing walls, etc) affecting the whole party',
    ],
    [
      new BoundedRange({ low: 2, high: 4 }),
      'small area trap (spike pit, quicksand, etc) affecting a few members of the party',
    ],
    [
      new BoundedRange({ low: 5, high: 7 }),
      'single target trap (poison needle, bladed pendulum, most treasure traps)',
    ],
    [new BoundedRange({ low: 8, high: 8 }), 'trick'],
  ]);
  /** The scale of consequences for failing to escape the trick or trap */
  private readonly SEVERITY = new Map<BoundedRange, string>([
    [
      new BoundedRange({ low: 1, high: 2 }),
      'annoyance (time tax, translocation, resource loss, et al',
    ],
    [
      new BoundedRange({ low: 3, high: 6 }),
      'drain (physical damage, temporary blindness, monster encounter or increased encounter rate, et al)',
    ],
    [
      new BoundedRange({ low: 7, high: 8 }),
      'loss (death, permanent ability loss, one-way teleporters, or other game-enders)',
    ],
  ]);
  /** The save or attribute which will protect a victim of the trick or trap from its effect */
  private readonly DEFENSE = new Map<number, string>([
    [1, 'Nothing (no defense applicable)'],
    [2, 'Death or Poison Save'],
    [3, 'Wand Save'],
    [4, 'Paralysis or Petrification Save'],
    [5, 'Breath Save'],
    [6, 'Magic Save'],
    [7, 'Armor Class'],
    [8, 'Ability Check'],
  ]);
  /** Abilities */
  private readonly ABILITIES = new Map<number, string>([
    [1, 'Strength'],
    [2, 'Intelligence'],
    [3, 'Wisdom'],
    [4, 'Dexterity'],
    [5, 'Constitution'],
    [6, 'Charisma'],
  ]);

  generateTrickOrTrap(): string {
    const defenseRoll: number = rollDice(this.d8);

    return 'A'.concat(
      this.rollOnRange(this.TYPE, this.d8),
      'resulting in',
      this.rollOnRange(this.SEVERITY, this.d8),
      'rolled against',
      this.rollOnList(this.DEFENSE, undefined, defenseRoll),
      defenseRoll === 8 ? `: ${this.rollOnList(this.ABILITIES)}` : ''
    );
  }
}
