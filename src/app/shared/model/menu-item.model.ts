import { doesExist } from '@shared/utilities/common-util/common.util';

/** View object for Menu Bar entries */
export class MenuItem {
  /** Any optioins that should occur as a drop down from this menu */
  children: MenuItem[];
  /** Whether or not this MenuItem is a root node - i.e. has child nodes beneath it - or not */
  get hasChildren(): boolean {
    return this.children.length > 0;
  }
  /** A unique identifier for this menu item */
  id: string;
  /** Whether or not the children for this menu item should be visible in the UI */
  isExpanded: boolean;
  /** The identifier of this menu item as rendered to the user */
  label: string;
  /** Optional link: indicates where this menu item should route when clicked */
  routerLink: string;

  /**
   * Class Constructor
   * @param  {string} id
   * @param  {string} label
   * @param  {MenuItem[]} children?
   * @param  {boolean} isExpanded?
   * @param  {string} routerLink?
   */
  constructor(
    id: string,
    label: string,
    children?: MenuItem[],
    isExpanded?: boolean,
    routerLink?: string
  ) {
    this.id = id;
    this.label = label;
    this.isExpanded = doesExist(isExpanded) ? isExpanded : false;
    this.children = doesExist(children) ? children : [];
    this.routerLink = doesExist(routerLink) ? routerLink : null;
  }
}
