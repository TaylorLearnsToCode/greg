import { LoadChildren, Route } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

/** LoadChildren function to load the Monster module */
const monsterChildren: LoadChildren = () =>
  import('@monster/monster.module').then((m) => m.MonsterModule);

/** Human-readable labels for configured route paths */
export enum RouteLabels {
  monster = 'Monster',
  welcome = 'Home',
}

/** Returns an array of Route objects configured for GREG. */
export function readRoutes(): Route[] {
  const routes: Route[] = [];
  routes.push({
    path: 'welcome',
    component: WelcomeComponent,
  });
  routes.push({
    path: 'monster',
    loadChildren: monsterChildren,
  });
  return routes;
}
