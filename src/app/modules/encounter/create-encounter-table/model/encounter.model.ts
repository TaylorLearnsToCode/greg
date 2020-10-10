import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';

/** A random or wandering entity which can be encountered by the party. */
export class Encounter {
  /** The minimum roll on a given encounter table that corresponds to this encounter. */
  lowRoll: number;
  /** The maximum roll on a given encounter table that corresponds to this encounter. */
  highRoll: number;
  /** A collection of Monster entities that make up the encounter. */
  monsters: Monster[];
  /** The title or name uniquely identifying this encounter table. */
  title: string;

  /**
   * Encounter constructor.
   * @param  {number} lowRoll
   * @param  {number} highRoll? - defaults to {lowRoll}
   * @param  {Monster[]} monsters? - defaults to empty array
   * @param  {string} title? - defaults to 'Encounter Table'
   */
  constructor(
    lowRoll: number,
    highRoll?: number,
    monsters?: Monster[],
    title?: string
  ) {
    this.lowRoll = lowRoll;
    this.highRoll = doesExist(highRoll) ? highRoll : lowRoll;
    this.monsters = doesExist(monsters) ? monsters : [];
    this.title = doesExist(title) ? title : 'Encounter Table';
  }
}
