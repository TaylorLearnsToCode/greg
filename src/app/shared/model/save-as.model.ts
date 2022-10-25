import { doesExist } from '@shared/utilities/common-util/common.util';
import { SaveAsClass } from './save-as-class.enum';

/** How a given monster saves, referencing player class and level. */
export class SaveAs {
  /** The playable class against whose table to compare for saves. */
  asClass: SaveAsClass;
  /** The level to check on the referenced class' description when consulting saves. */
  level: number;

  constructor(saveAs?: SaveAs) {
    saveAs = doesExist(saveAs) ? saveAs : ({} as SaveAs);
    this.asClass = doesExist(saveAs.asClass)
      ? (saveAs.asClass as SaveAsClass)
      : SaveAsClass.FTR;
    this.level = doesExist(saveAs.level) ? saveAs.level : 0;
  }
}
