import { Injectable } from '@angular/core';
import { AbstractInspirationService } from '@generate/model/abstract-inspiration-service.model';
import { BoundedRange } from '@shared/model/utility/bounded-range.model';
import { rollDice } from '@shared/utilities/dice-util/dice.util';

@Injectable({
  providedIn: 'root',
})
export class InspireSpecialDungeonRoomService extends AbstractInspirationService {
  /** How good or bad the special encouter is for the party when engaged */
  private readonly DISPOSITION = new Map<BoundedRange, string>([
    [new BoundedRange({ low: 1, high: 1 }), 'very bad for'],
    [new BoundedRange({ low: 2, high: 2 }), 'bad for'],
    [new BoundedRange({ low: 3, high: 4 }), 'indifferent to'],
    [new BoundedRange({ low: 5, high: 5 }), 'good for'],
    [new BoundedRange({ low: 6, high: 6 }), 'very good for'],
  ]);
  /** What part of the session the special affects */
  private readonly TARGET = new Map<BoundedRange, string>([
    [new BoundedRange({ low: 1, high: 2 }), 'the character or characters'],
    [new BoundedRange({ low: 3, high: 4 }), 'the player or players'],
    [new BoundedRange({ low: 5, high: 6 }), 'the environment'],
  ]);
  /** Collection of effects that target the character or characters */
  private readonly CHARACTER_EFFECTS = new Map<number, string>([
    [1, 'a power or feature of race or class'],
    [2, 'the character abilities'],
    [3, 'an intangible: time, a biological function, navigation, et al'],
    [4, 'a consumable: rations, torches, ammunition, et al'],
    [5, 'a non-consumable: armor, equipment, et al'],
    [
      6,
      'meta-elements of the character sheet: saving throws, XP, alignment, et al',
    ],
  ]);
  /** Collection of effects that target the player or players */
  private readonly PLAYER_EFFECTS = new Map<number, string>([
    [1, 'map or directional hints'],
    [2, 'monster or inhabitant hints'],
    [3, 'treasure (or dearth thereof) hints'],
    [4, 'hazard hints: other special rooms, traps, et al'],
    [
      5,
      'non-player character: prisoners, curious ghosts, talking statues, et al',
    ],
    [
      6,
      'an immersion element: a smell, a taste, et al - in homage to the tone',
    ],
  ]);
  /** Collection of effects that target the environment or dungeon */
  private readonly ENVIRONMENT_EFFECTS = new Map<number, string>([
    [1, 'changes to the layout or floor plan'],
    [
      2,
      'changes to the inhabitants, encounters, or frequency or number of either',
    ],
    [
      3,
      'changes to the doors, entries, or exits - locking, unlocking, hiding, showing, et al',
    ],
    [4, 'translocation: one way teleporters, chutes, ladders, et al'],
    [
      5,
      'changes to dungeon hazards: disarming (or arming) traps, slowly flooding the level, et al',
    ],
    [
      6,
      'changes to secret features: revealing or concealing, exposing or sealing, et al',
    ],
  ]);
  /** How long, how persistent the result of engaging the special room is */
  private readonly DURATION = new Map<BoundedRange, string>([
    [new BoundedRange({ low: 1, high: 2 }), 'only the immediate'],
    [new BoundedRange({ low: 3, high: 5 }), 'the short term'],
    [new BoundedRange({ low: 6, high: 6 }), 'the long term'],
  ]);

  generateSpecialEffect(): string {
    const targetRoll = rollDice(this.d6);
    return 'Special:'.concat(
      this.rollOnRange(this.DISPOSITION),
      'the party, targeting',
      this.rollOnRange(this.TARGET, undefined, targetRoll),
      ', specifically',
      this.deriveTargetEffect(targetRoll),
      ': the ramifications for which persist for',
      this.rollOnRange(this.DURATION)
    );
  }

  private deriveTargetEffect(targetRoll: number): string {
    if (targetRoll < 3) {
      return this.rollOnList(this.CHARACTER_EFFECTS);
    } else if (targetRoll < 5) {
      return this.rollOnList(this.PLAYER_EFFECTS);
    } else {
      return this.rollOnList(this.ENVIRONMENT_EFFECTS);
    }
  }
}
