import { Component, Input } from '@angular/core';
import { doesExist, isEmpty } from '@shared/utilities/common-util/common.util';

@Component({
  selector: 'greg-print-list',
  templateUrl: './print-list.component.html',
  styleUrls: ['./print-list.component.scss'],
})
export class PrintListComponent {
  @Input() list: object[];
  @Input() set includeProperties(properties: string) {
    if (doesExist(properties) && !isEmpty(properties)) {
      this.itemProps = properties.split(',');
    }
  }

  itemProps: string[] = ['name'];

  constructor() {}

  getValue(item: any, prop: string): any {
    return item[prop];
  }
}
