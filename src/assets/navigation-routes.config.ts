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
        menuLabel: 'Configure Treasure Map',
        routePath: 'treasure-map',
      } as NavRoute,
      {
        menuLabel: 'Configure Treasure Type',
        routePath: 'treasure-type',
      } as NavRoute,
      {
        menuLabel: 'Configure Treasure Type Table',
        routePath: 'treasure-type-table',
      } as NavRoute,
      {
        menuLabel: 'TEMP: Convery Legacy',
        routePath: 'TEMP-convert-legacy',
      } as NavRoute,
    ],
    menuLabel: 'Configure',
    routePath: 'configure',
  } as NavRoute,
  {
    children: [
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
];
