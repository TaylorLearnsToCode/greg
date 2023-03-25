import { Component, Input, OnInit } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';
import { cloneObject } from '@shared/utilities/common-util/common.util';

@Component({
  selector: 'greg-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
})
export class PageTemplateComponent implements OnInit {
  @Input() pageDisplayMode: PageDisplayMode;

  hideSecondContent: boolean;
  get wrapperClasses(): string[] {
    return cloneObject(this._wrapperClasses);
  }

  private _wrapperClasses: string[];

  ngOnInit(): void {
    this.setWrapperClasses();
  }

  /**
   * Sets style class to determine layout according to provided input.
   * Two panel, side by side, by default.
   */
  private setWrapperClasses(): void {
    this._wrapperClasses = [];
    switch (this.pageDisplayMode) {
      case PageDisplayMode.SINGLE: {
        this._wrapperClasses.push('page-template--single');
        this.hideSecondContent = true;
        break;
      }
      case PageDisplayMode.STACKED: {
        this._wrapperClasses.push('page-template--stacked');
        break;
      }
      case PageDisplayMode.DOUBLE:
      default: {
        this._wrapperClasses.push('page-template--double');
        break;
      }
    }
  }
}
