import { doesExist } from '@shared/utilities/common-util/common.util';

export class SaveAs {
  asClass: string;
  level: number;

  constructor(asClass?: string, level?: number) {
    this.asClass = doesExist(asClass) ? asClass : 'Normal Man';
    this.level = doesExist(level) ? level : 0;
  }
}
