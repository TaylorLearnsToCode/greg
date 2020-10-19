import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from '@shared/model/menu-item.model';
import { doesExist, isEmpty } from '@shared/utilities/common-util/common.util';
import { routeToMenuItem } from '@shared/utilities/conversion-util/conversion.util';
import { readRoutes } from '@shared/utilities/navigation-config/navigation-config.util';

/** UI element for horizontal menu bar, complete with routing options */
@Component({
  selector: 'greg-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent {
  /** Read-only collection of elements to add to the menu bar, based on routing definitions */
  readonly menuItems = this.getMenuItems();

  /**
   * Component Constructor
   * @param  {Router} privaterouter
   */
  constructor(private router: Router) {}

  /**
   * Click handler for elements rendered by the menu.
   * * If an item has children, assumes is header: expands child menu
   * * Otherwise, attempts to follow the configured routes: primarily, parent route, nested, item route.
   *   Closes parent menu after execution.
   * @param  {MenuItem} itemRef
   * @param  {MenuItem} parentItem?
   */
  clickMenuItem(itemRef: MenuItem, parentItem?: MenuItem): void {
    this.closeParentItem(parentItem);
    itemRef.hasChildren
      ? this.toggleExpansionStatus(itemRef)
      : this.routeToItem(itemRef, parentItem);
  }

  /**
   * For a provided MenuItem, contracts the child menu.
   * Null safe.
   * @param  {MenuItem} parentItem
   */
  private closeParentItem(parentItem: MenuItem): void {
    if (doesExist(parentItem)) {
      parentItem.isExpanded = false;
    }
  }

  /** Returns a parsed array of MenuItem objects based on the routes configured for the app */
  private getMenuItems(): MenuItem[] {
    const returnArray: Route[] = readRoutes();
    returnArray.forEach((route) => {
      if (doesExist(route.children) && !isEmpty(route.children)) {
        route.children = route.children.filter(
          (childRoute) => !isEmpty(childRoute.path) && childRoute.path !== '**'
        );
      }
    });
    return returnArray.map((route) => routeToMenuItem(route));
  }

  /**
   * Routes to the routerLink configured in a provided itemRef.
   * If a parentItem is provided, treats itemRef as a nested route inside the routerLink of the parent.
   * @param  {MenuItem} itemRef
   * @param  {MenuItem} parentItem?
   */
  private routeToItem(itemRef: MenuItem, parentItem?: MenuItem): void {
    this.router.navigate([
      ''.concat(
        doesExist(parentItem) ? parentItem.routerLink : '',
        itemRef.routerLink
      ),
    ]);
  }

  /**
   * Toggles the expansion status of the children in a provided itemRef:
   * * If expanded, contracts children
   * * If contracted, expands children
   * @param  {MenuItem} itemRef
   */
  private toggleExpansionStatus(itemRef: MenuItem): void {
    this.menuItems.forEach((item) =>
      item.id !== itemRef.id
        ? (item.isExpanded = false)
        : (item.isExpanded = !item.isExpanded)
    );
  }
}
