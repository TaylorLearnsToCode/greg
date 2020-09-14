import { Route } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

/** Human-readable labels for configured route paths */
export enum RouteLabels {
  welcome = 'Home',
  test = 'Test',
  test1 = 'Test1',
  test2 = 'Test2',
}

/** Returns an array of Route objects configured for GREG. */
export function readRoutes(): Route[] {
  const routes: Route[] = [];
  routes.push({
    path: 'welcome',
    component: WelcomeComponent,
  });
  routes.push({
    path: 'test',
    component: WelcomeComponent,
    children: [
      {
        path: 'test1',
        component: WelcomeComponent,
      },
      { path: 'test2', component: WelcomeComponent },
    ],
  });
  return routes;
}
