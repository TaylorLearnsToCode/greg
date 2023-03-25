import { NavRoute } from '@shared/model/nav-route.interface';

/** Utility constant to contain lazy-loaded route metadata available in the navigation bar. */
export const NAVIGATION_ROUTES: NavRoute[] = [
  {
    menuLabel: 'Welcome',
    routePath: '',
    import: true,
  } as NavRoute,
  {
    menuLabel: 'Configure',
    routePath: 'configure',
    import: true,
  } as NavRoute,
  {
    menuLabel: 'Generate',
    routePath: 'generate',
    import: true,
  } as NavRoute,
];
