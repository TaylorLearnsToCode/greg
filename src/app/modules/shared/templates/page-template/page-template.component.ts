import { Component, Input, OnInit } from '@angular/core';

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
  /** Flag - if TRUE, the 'data' selector will be turned off */
  @Input() isSingleColumn: boolean;

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
    this._shouldDisplayHeaderSubtext = !this.headerSubtext;
  }

  /** Sets parent wrapper class to single or double based on isSingleColumn input */
  private setWrapperClasses(): void {
    this._wrapperClasses = this.isSingleColumn
      ? ['page-template--single']
      : ['page-template--double'];
  }
}
