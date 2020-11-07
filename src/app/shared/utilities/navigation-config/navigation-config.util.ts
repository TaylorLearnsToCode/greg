import { LoadChildren, Route } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

/** LoadChildren function to load the Create Encounter Table module */
/* istanbul ignore next */
const createEncounterTable: LoadChildren = () =>
  import(
    '@encounter/create-encounter-table/create-encounter-table.module'
  ).then((m) => m.CreateEncounterTableModule);

/** Other LoadChildren function to load the Create Encounter Table module */
/* istanbul ignore next */
const createEncounterTableDeux: LoadChildren = () =>
  import(
    '@encounter/create-encounter-table-deux/create-encounter-table-deux.module'
  ).then((m) => m.CreateEncounterTableDeuxModule);

/** LoadChildren function to load the Encounter Not Found module */
/* istanbul ignore next */
const encounterNotFound: LoadChildren = () =>
  import('@encounter/encounter-not-found/encounter-not-found.module').then(
    (m) => m.EncounterNotFoundModule
  );

/** LoadChildren function to load the Enter Monster module */
/* istanbul ignore next */
const enterMonster: LoadChildren = () =>
  import('@monster/enter-monster/enter-monster.module').then(
    (m) => m.EnterMonsterModule
  );

/** LoadChildren function to load the Monster Not Found module */
/* istanbul ignore next */
const monsterNotFound: LoadChildren = () =>
  import('@monster/monster-not-found/monster-not-found.module').then(
    (m) => m.MonsterNotFoundModule
  );

/** Human-readable labels for configured route paths */
export enum RouteLabels {
  'create-encounter-table' = 'Create Encounter Table',
  'create-encounter-table-deux' = 'Create Encounter Table Deux',
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
    path: 'create-encounter-table-deux',
    loadChildren: createEncounterTableDeux,
  });
  encounterRoutes.push({
    path: '**',
    loadChildren: encounterNotFound,
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
