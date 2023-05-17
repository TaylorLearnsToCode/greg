import { NavRoute } from '@shared/model/ui/nav-route.interface';

/** Utility constant to contain lazy-loaded route metadata available in the navigation bar. */
export const NAVIGATION_ROUTES: NavRoute[] = [
  {
    import: true,
    menuLabel: 'Welcome',
    routePath: '',
  } as NavRoute,
  {
    import: true,
    isExpanded: false,
    children: [
      {
        menuLabel: 'Configure Magic Item',
        routePath: 'magic-item',
      } as NavRoute,
      {
        menuLabel: 'Configure Magic Item Table',
        routePath: 'magic-item-table',
      } as NavRoute,
      {
        menuLabel: 'Configure Monster Entry',
        routePath: 'monster-entry',
      } as NavRoute,
      {
        menuLabel: 'Configure Monster Encounter List',
        routePath: 'monster-encounter-list',
      } as NavRoute,
      {
        menuLabel: 'Configure Treasure Map',
        routePath: 'treasure-map',
      } as NavRoute,
      {
        menuLabel: 'Configure Treasure Type',
        routePath: 'treasure-type',
      } as NavRoute,
      {
        menuLabel: 'Configure Weapon Powers',
        routePath: 'weapon-power',
      } as NavRoute,
      {
        menuLabel: 'TEMP: Convert Legacy',
        routePath: 'TEMP-convert-legacy',
      } as NavRoute,
    ],
    menuLabel: 'Configure',
    routePath: 'configure',
  } as NavRoute,
  {
    children: [
      {
        menuLabel: 'Generate Dungeon',
        routePath: 'dungeon',
      } as NavRoute,
      {
        menuLabel: 'Generate Monster Encounter',
        routePath: 'monster-encounter',
      } as NavRoute,
      {
        menuLabel: 'Generate Treasure Map',
        routePath: 'treasure-map',
      } as NavRoute,
      {
        menuLabel: 'Generate Treasure from Type',
        routePath: 'treasure-from-type',
      } as NavRoute,
    ],
    import: true,
    menuLabel: 'Generate',
    routePath: 'generate',
  } as NavRoute,
  {
    import: true,
    menuLabel: 'Data',
    routePath: 'admin',
  } as NavRoute,
];
