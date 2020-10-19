import { LoadChildren, Route } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

/** LoadChildren function to load the Create Encounter Table module */
/* istanbul ignore next */
const createEncounterTable: LoadChildren = () =>
  import(
    '@encounter/create-encounter-table/create-encounter-table.module'
  ).then((m) => m.CreateEncounterTableModule);

/** LoadChildren function to load the Encounter module */
/* istanbul ignore next */
const encounter: LoadChildren = () =>
  import('@encounter/encounter.module').then((m) => m.EncounterModule);

/** LoadChildren function to load the Enter Monster module */
/* istanbul ignore next */
const enterMonster: LoadChildren = () =>
  import('@monster/enter-monster/enter-monster.module').then(
    (m) => m.EnterMonsterModule
  );

/** LoadChildren function to load the Monster module */
/* istanbul ignore next */
const monsterNotFound: LoadChildren = () =>
  import('@monster/monster-not-found/monster-not-found.module').then(
    (m) => m.MonsterModule
  );

/** Human-readable labels for configured route paths */
export enum RouteLabels {
  'create-encounter-table' = 'Create Encounter Table',
  encounter = 'Encounter',
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
  routes.push(buildEncounterRoute());
  return routes;
}

/** "Private" function to return exclusively routes pertaining to the Encounter module. */
function buildEncounterRoute(): Route {
  const encounterRoutes: Route[] = [];
  encounterRoutes.push({
    path: 'create-encounter-table',
    loadChildren: createEncounterTable,
  });
  encounterRoutes.push({
    path: '**',
    loadChildren: encounter,
  });
  return {
    path: 'encounter',
    children: [...encounterRoutes],
  } as Route;
}

/** "Private" function to return exclusively routes pertaining to the Monster module. */
function buildMonsterRoute(): Route {
  const monsterRoutes: Route[] = [];
  monsterRoutes.push({
    path: 'enter-monster',
    loadChildren: enterMonster,
  });
  monsterRoutes.push({
    path: '**',
    loadChildren: monsterNotFound,
  });
  return {
    path: 'monster',
    children: [...monsterRoutes],
  } as Route;
}
