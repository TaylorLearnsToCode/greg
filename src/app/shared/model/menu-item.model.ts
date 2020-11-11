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

  constructor(menuItem?: MenuItem) {
    menuItem = doesExist(menuItem) ? menuItem : ({} as MenuItem);
    this.children = doesExist(menuItem.children)
      ? menuItem.children.map((item) => new MenuItem(item))
      : [];
    this.id = doesExist(menuItem.id) ? menuItem.id : '';
    this.isExpanded = doesExist(menuItem.isExpanded)
      ? menuItem.isExpanded
      : false;
    this.label = doesExist(menuItem.label) ? menuItem.label : '';
    this.routerLink = doesExist(menuItem.routerLink)
      ? menuItem.routerLink
      : null;
  }
}
