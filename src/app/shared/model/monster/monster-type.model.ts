import { constructInstance } from '@shared/utilities/common-util/common.util';
import { AbstractQuantifiableItem } from '../framework/abstract-quantifiable-item.model';
import { TreasureArticle } from '../treasure/treasure-article.model';
import { MonsterConsort } from './monster-consort.model';

export class MonsterType extends AbstractQuantifiableItem {
  pctInLair: number = 0;
  /** The configured type of treasure found in the creature's lair */
  treasureType: string = '';
  /** The treasure that the monster carries with it outside the lair */
  treasurePerCap: TreasureArticle[] = [];
  /**
   * Leaders, bruisers, special units which will occur proportionally to the size of the
   * monster encounter. E.G. - "One sargeant per ten soldiers"
   */
  consorts: MonsterConsort[] = [];
  /**
   * Static monsters accompanying an encounter. E.G. - "A priest will always be accompanied
   * by 2-12 acolytes"
   */
  retinue: MonsterType[] = [];

  constructor(type?: any) {
    super();
    constructInstance(this, type);
    this.handleConsorts();
    this.handleRetinue();
  }

  private handleConsorts() {
    this.consorts = this.consorts.map((c) => new MonsterConsort(c));
  }

  private handleRetinue() {
    this.retinue = this.retinue.map((r) => new MonsterType(r));
  }
}
