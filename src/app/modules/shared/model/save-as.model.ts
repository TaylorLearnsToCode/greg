import { doesExist } from '@shared/utilities/common-util/common.util';

export class SaveAs {
  asClass: SaveAsClass;
  level: number;

  constructor(asClass?: SaveAsClass, level?: number) {
    this.asClass = doesExist(asClass) ? asClass : SaveAsClass.FTR;
    this.level = doesExist(level) ? level : 0;
  }
}

export enum SaveAsClass {
  FTR = 'FTR',
  MU = 'MU',
}
