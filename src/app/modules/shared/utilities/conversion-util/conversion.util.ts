import { Route } from '@angular/router';
import { MenuItem } from '../../model/menu-item.model';
import { RouteLabels } from '../../utilities/navigation-config/navigation-config.util';
import { doesExist } from '../common-util/common.util';

/**
 * Converts a provided Route to a MenuItem with label.
 * Any child routes are likewise converted recursively.
 * @param  {Route} route
 */
export function routeToMenuItem(route: Route): MenuItem {
  return new MenuItem(
    route.path,
    doesExist(RouteLabels[route.path]) ? RouteLabels[route.path] : route.path,
    route.children
      ? route.children.map((childRoute) => routeToMenuItem(childRoute))
      : [],
    false,
    `/${route.path}`
  );
}
