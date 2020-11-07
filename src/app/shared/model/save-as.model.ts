import { doesExist } from '@shared/utilities/common-util/common.util';

/** How a given monster saves, referencing player class and level. */
export class SaveAs {
  /** The playable class against whose table to compare for saves. */
  asClass: SaveAsClass;
  /** The level to check on the referenced class' description when consulting saves. */
  level: number;

  /**
   * SaveAs Constructor
   * @param  {SaveAsClass} asClass? Defaults to SaveAsClass.FTR
   * @param  {number} level? Defaults to 0
   * @todo convert to single object constructor
   */
  constructor(asClass?: SaveAsClass, level?: number) {
    this.asClass = doesExist(asClass) ? asClass : SaveAsClass.FTR;
    this.level = doesExist(level) ? level : 0;
  }
}

/** Supported playable classes for comparison calculating monster saves */
export enum SaveAsClass {
  /** Fighting Man */
  FTR,
  /** Magic User */
  MU,
}
