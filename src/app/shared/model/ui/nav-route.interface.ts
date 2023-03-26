/** Model for menu options in the navigation bar. */
export interface NavRoute {
  /** Other clickable options to be nested under this route. */
  children: NavRoute[];
  /** Promise for use with LoadChildren */
  import: boolean;
  /** Whether or not this item is expanded in the UI */
  isExpanded: boolean;
  /** The label to be applied to the clickable button */
  menuLabel: string;
  /** The path in the Angular router associated with this option. */
  routePath: string;
}
