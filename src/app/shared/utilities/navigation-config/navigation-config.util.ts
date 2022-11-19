import { LoadChildren, Route } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

/** LoadChildren function to load the Create Encounter Table module */
/* istanbul ignore next */
const createEncounterTable: LoadChildren = () =>
  import(
    '@encounter/create-encounter-table/create-encounter-table.module'
  ).then((m) => m.CreateEncounterTableModule);

/** LoadChildren function to load the Create Encounter Table from Monsters module */
/* istanbul ignore next */
const createFromMonster: LoadChildren = () =>
  import('@encounter/create-from-monster/create-from-monster.module').then(
    (m) => m.CreateFromMonsterModule
  );

/** LoadChildren function to load the Encounter Not Found module */
/* istanbul ignore next */
const encounterNotFound: LoadChildren = () =>
  import('@encounter/encounter-not-found/encounter-not-found.module').then(
    (m) => m.EncounterNotFoundModule
  );

/** LoadChildren function to load the Enter Map or Magic Item module */
/* istanbul ignore next */
const enterMapOrMagic: LoadChildren = () =>
  import('@treasure/enter-map-or-magic/enter-map-or-magic.module').then(
    (m) => m.EnterMapOrMagicModule
  );

/** LoadChildren function to load the Enter Monster module */
/* istanbul ignore next */
const enterMonster: LoadChildren = () =>
  import('@monster/enter-monster/enter-monster.module').then(
    (m) => m.EnterMonsterModule
  );

/** LoadChildren function to load the Enter Treasure module */
/* istanbul ignore next */
const enterTreasure: LoadChildren = () =>
  import('@treasure/enter-treasure/enter-treasure.module').then(
    (m) => m.EnterTreasureModule
  );

/** LoadChildren function to load the Monster Not Found module */
/* istanbul ignore next */
const monsterNotFound: LoadChildren = () =>
  import('@monster/monster-not-found/monster-not-found.module').then(
    (m) => m.MonsterNotFoundModule
  );

/** LoadChildren function to load the Treasure Not Found module */
/* istanbul ignore next */
const treasureNotFound: LoadChildren = () =>
  import('@treasure/treasure-not-found/treasure-not-found.module').then(
    (m) => m.TreasureNotFoundModule
  );

/** Human-readable labels for configured route paths */
export enum RouteLabels {
  'create-encounter-table' = 'Create Encounter Table',
  'create-encounter-table-deux' = 'Create Encounter Table Deux',
  'create-from-monster' = 'Create from Monster',
  encounter = 'Encounter',
  'enter-map-or-magic' = 'Enter Map or Magic Item',
  'enter-monster' = 'Enter Monster',
  'enter-treasure' = 'Enter Treasure',
  monster = 'Monster',
  treasure = 'Treasure',
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
  routes.push(buildTreasureRoute());
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
    path: 'create-from-monster',
    loadChildren: createFromMonster,
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

/** "Private" function to return exclusively routes pertaining to the Treasure module. */
function buildTreasureRoute(): Route {
  const treasureRoutes: Route[] = [];
  treasureRoutes.push({
    path: 'enter-treasure',
    loadChildren: enterTreasure,
  });
  treasureRoutes.push({
    path: 'enter-map-or-magic',
    loadChildren: enterMapOrMagic,
  });
  treasureRoutes.push({
    path: '**',
    loadChildren: treasureNotFound,
  });
  return {
    path: 'treasure',
    children: [...treasureRoutes],
  } as Route;
}
