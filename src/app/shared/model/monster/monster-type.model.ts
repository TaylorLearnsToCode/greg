import {
  constructInstance,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';
import { TreasureArticle } from '../treasure/treasure-article.model';
import { TreasureType } from '../treasure/treasure-type.model';
import { DiceRolled } from '../utility/dice-rolled.model';
import { MonsterConsort } from './monster-consort.model';
import { MonsterRetinue } from './monster-retinue.model';

export class MonsterType extends AbstractQuantifiableItem {
  /**
   * Leaders, bruisers, special units which will occur proportionally to the size of the
   * monster encounter. E.G. - "One sargeant per ten soldiers"
   */
  consorts: MonsterConsort[] = [];
  /** The percent chance for the monster to be in its lair when encountered */
  pctInLair: number = 0;
  /** The number of monsters encountered when in the creature's lair */
  quantityInLair: DiceRolled = new DiceRolled();
  /**
   * Static monsters accompanying an encounter. E.G. - "A priest will always be accompanied
   * by 2-12 acolytes"
   */
  retinue: MonsterRetinue[] = [];
  /** The configured type of treasure found in the creature's lair */
  treasureType: string = '';
  /** The treasure that the monster carries with it outside the lair */
  treasurePerCap: (TreasureArticle | TreasureType)[] = [];

  constructor(type?: any) {
    super();
    constructInstance(this, type);
    this.handleConsorts();
    this.handleRetinue();
    this.handleTreasurePerCap();
  }

  private handleConsorts() {
    this.consorts = this.consorts.map((c) => new MonsterConsort(c));
  }

  private handleRetinue() {
    this.retinue = this.retinue.map((r) => new MonsterRetinue(r));
  }

  private handleTreasurePerCap() {
    this.treasurePerCap = this.treasurePerCap.map((t) =>
      doesExist(t.type) ? new TreasureType(t) : new TreasureArticle(t)
    );
  }
}
