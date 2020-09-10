import { Component, Input, OnInit } from '@angular/core';

/**
 * Template component for a standard one-column or adaptive two-column layout.
 * @input {string} headerText: The text displayed in an H1 at the top of the page. Defaults to site title.
 * @input {string} headerSubtext: The text displayed in italics beneath the main header.
 */
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
    return this.displayHeaderSubtext;
  }

  /** Private flag controlling whether or not to render the subtext container */
  private displayHeaderSubtext: boolean;

  /**
   * Initializer Method.
   */
  ngOnInit(): void {
    this.initializeHeaderText();
    this.setDisplayHeaderSubtext();
  }

  /**
   * If no header text has been provided in the Input, defaults to application name.
   */
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
    this.displayHeaderSubtext = !this.headerSubtext;
  }
}
