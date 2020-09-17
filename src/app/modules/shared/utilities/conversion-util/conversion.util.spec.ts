import { Route } from '@angular/router';
import { MenuItem } from '@shared/model/menu-item.model';
import { getTestRoute } from '@test/route.mock';
import { routeToMenuItem } from './conversion.util';

describe('ConversionUtil', () => {
  describe('routeToMenuItem', () => {
    let constantMenuItem: MenuItem;
    let parentRoute: Route;
    let route: Route;
    let variableMenuItem: MenuItem;

    beforeEach(() => {
      constantMenuItem = new MenuItem('', '');
      route = getTestRoute();
      parentRoute = getTestRoute('parent-path', [route]);
      variableMenuItem = undefined;
    });

    it('should return a MenuItem', () => {
      constantMenuItem.id = route.path;
      constantMenuItem.label = route.path;
      constantMenuItem.routerLink = `/${route.path}`;
      variableMenuItem = routeToMenuItem(route);
      expect(variableMenuItem).toEqual(constantMenuItem);
    });

    it('should return a MenuItem with children', () => {
      constantMenuItem.id = parentRoute.path;
      constantMenuItem.label = parentRoute.path;
      constantMenuItem.routerLink = `/${parentRoute.path}`;
      constantMenuItem.children = [routeToMenuItem(route)];
      variableMenuItem = routeToMenuItem(parentRoute);
      expect(variableMenuItem).toEqual(constantMenuItem);
    });
  });
});
