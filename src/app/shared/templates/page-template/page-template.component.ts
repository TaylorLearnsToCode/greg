import { Component, Input, OnInit } from '@angular/core';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';
import { doesExist } from '@shared/utilities/common-util/common.util';

/** Template component for a standard one-column or adaptive two-column layout. */
@Component({
  selector: 'greg-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
})
export class PageTemplateComponent implements OnInit {
  /** The title text of the page - to be printed as h1 */
  @Input() headerText: string;
  /** The subtitle text of the page - to be printed in italics */
  @Input() headerSubtext: string;
  /** How the layout should render; defaults to two-column, DOUBLE */
  @Input() pageDisplayMode: PageDisplayMode;

  /** Local read-only instance for supported page display modes. */
  readonly PAGE_DISPLAY_MODES = PageDisplayMode;

  /** Read-only accessor for whether or not the subtext container in the header should render. */
  get shouldDisplayHeaderSubtext(): boolean {
    return this._shouldDisplayHeaderSubtext;
  }
  /** Read-only accessor for the style classes to be applied to the page template */
  get wrapperClasses(): string[] {
    return this._wrapperClasses;
  }

  /** Private flag controlling whether or not to render the subtext container */
  private _shouldDisplayHeaderSubtext: boolean;
  /** Private container for style class to be applied to the page template wrapper */
  private _wrapperClasses: string[];

  /** Initializer Method. */
  ngOnInit(): void {
    this.initializeHeaderText();
    this.setDisplayHeaderSubtext();
    this.setWrapperClasses();
  }

  /** If no header text has been provided in the Input, defaults to application name. */
  private initializeHeaderText(): void {
    if (!this.headerText) {
      this.headerText = 'GREG - Guided Random Encounter Generator';
    }
  }

  /**
   * Sets displayHeaaderSubtext flag:
   * * If no subtext is provided, sets to FALSE, hiding the element.
   * * If subtext is provided, sets to TRUE, showing the element.
   */
  private setDisplayHeaderSubtext(): void {
    this._shouldDisplayHeaderSubtext = doesExist(this.headerSubtext);
  }

  /** Sets parent wrapper class to single or double based on pageDisplayMode input */
  private setWrapperClasses(): void {
    this._wrapperClasses = [];
    switch (this.pageDisplayMode) {
      case PageDisplayMode.SINGLE: {
        this._wrapperClasses.push('page-template--single');
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
