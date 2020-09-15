import { readRoutes, RouteLabels } from './navigation-config.util';

describe('NavigationUtil', () => {
  describe('readRoutes', () => {
    it('should return a set of routes', () => {
      const routes = readRoutes();
      expect(routes).toBeTruthy();
      routes.forEach((route) => {
        expect(RouteLabels[route.path]).toBeTruthy();
      });
    });
  });
});
