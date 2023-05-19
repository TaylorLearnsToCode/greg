import { Injectable } from '@angular/core';
import { AbstractInspirationService } from '@generate/model/abstract-inspiration-service.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';

@Injectable({
  providedIn: 'root',
})
export class InspireTrickOrTrapService extends AbstractInspirationService {
  /** What kind of trap or trick it is */
  private readonly TYPE = new Map<BoundedRange, string>([
    [
      new BoundedRange({ low: 1, high: 1 }),
      'whole room trap (poison gas, closing walls, etc) affecting the whole party',
    ],
    [
      new BoundedRange({ low: 2, high: 3 }),
      'small area trap (spike pit, quicksand, etc) affecting a few members of the party',
    ],
    [
      new BoundedRange({ low: 4, high: 5 }),
      'single target trap (poison needle, bladed pendulum, most treasure traps)',
    ],
    [new BoundedRange({ low: 6, high: 6 }), 'trick'],
  ]);
  /** The scale of consequences for failing to escape the trick or trap */
  private readonly SEVERITY = new Map<BoundedRange, string>([
    [
      new BoundedRange({ low: 1, high: 2 }),
      'annoyance (time tax, translocation, resource loss, et al',
    ],
    [
      new BoundedRange({ low: 3, high: 4 }),
      'drain (physical damage, temporary blindness, monster encounter or increased encounter rate, et al)',
    ],
    [
      new BoundedRange({ low: 5, high: 6 }),
      'loss (death, permanent ability loss, one-way teleporters, or other game-enders)',
    ],
  ]);
  /** The save or attribute which will protect a victim of the trick or trap from its effect */
  private readonly DEFENSE = new Map<number, string>([
    [1, 'Death or Poison Save'],
    [2, 'Wand Save'],
    [3, 'Paralysis or Petrification Save'],
    [4, 'Breath Save'],
    [5, 'Magic Save'],
    [6, 'Armor Class'],
  ]);

  generateTrickOrTrap(): string {
    return 'A'.concat(
      this.rollOnRange(this.TYPE),
      'resulting in',
      this.rollOnRange(this.SEVERITY),
      'rolled against',
      this.rollOnList(this.DEFENSE)
    );
  }
}
