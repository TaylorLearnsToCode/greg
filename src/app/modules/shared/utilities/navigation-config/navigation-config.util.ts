import { LoadChildren, Route } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

/** LoadChildren function to load the Enter Monster module */
const enterMonster: LoadChildren = () =>
  import('@monster/enter-monster/enter-monster.module').then(
    (m) => m.EnterMonsterModule
  );

/** LoadChildren function to load the Monster module */
const monster: LoadChildren = () =>
  import('@monster/monster.module').then((m) => m.MonsterModule);

/** Human-readable labels for configured route paths */
export enum RouteLabels {
  'enter-monster' = 'Enter Monster',
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
  routes.push(buildMonsterRoute());
  return routes;
}

/** "Private" function to return exclusively routes pertaining to the Monster module */
function buildMonsterRoute(): Route {
  const monsterRoutes: Route[] = [];
  monsterRoutes.push({
    path: 'enter-monster',
    loadChildren: enterMonster,
  });
  monsterRoutes.push({
    path: '**',
    loadChildren: monster,
  });
  return {
    path: 'monster',
    children: [...monsterRoutes],
  } as Route;
}
