import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { NAVIGATION_ROUTES } from '@assets/app-configs/navigation-routes.config';
import { NavRoute } from '@shared/model/ui/nav-route.interface';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { throwError } from '@shared/utilities/framework-util/framework.util';

/** Iterates through configured NAVIGATION_ROUTES and, for each, adds a Route to the application routing. */
function buildRoutes(): Routes {
  const routes: Routes = [];
  for (const navRoute of NAVIGATION_ROUTES) {
    routes.push(buildRoute(navRoute));
  }
  return routes;
}

/**
 * @param  {NavRoute} navRoute
 * @returns A router-ready lazy import of the corresponding module to a provided navRoute
 */
function buildRoute(navRoute: NavRoute): Route {
  let route: Route = {
    path: navRoute.routePath,
  } as Route;

  if (doesExist(navRoute.import)) {
    switch (navRoute.menuLabel) {
      case 'Welcome':
        route = {
          ...route,
          loadChildren: () =>
            import('@welcome/welcome.module').then((m) => m.WelcomeModule),
        };
        break;
      case 'Configure':
        route = {
          ...route,
          loadChildren: () =>
            import('@configure/configure.module').then(
              (m) => m.ConfigureModule
            ),
        };
        break;
      case 'Generate':
        route = {
          ...route,
          loadChildren: () =>
            import('@generate/generate.module').then((m) => m.GenerateModule),
        };
        break;
      case 'Inspire':
        route = {
          ...route,
          loadChildren: () =>
            import('@inspire/inspire.module').then((m) => m.InspireModule),
        };
        break;
      case 'Admin':
        route = {
          ...route,
          loadChildren: () =>
            import('@admin/admin.module').then((m) => m.AdminModule),
        };
        break;
      default:
        throwError(
          `Module ${navRoute.menuLabel} has not yet been enabled in the application routing.`
        );
    }
  }

  return route;
}

@NgModule({
  imports: [RouterModule.forRoot(buildRoutes())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
