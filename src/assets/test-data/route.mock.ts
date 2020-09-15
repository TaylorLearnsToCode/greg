import { Route } from '@angular/router';
import { doesExist } from '../../app/modules/shared/utilities/common-util/common.util';

/** Default test path string */
export const TEST_PATH = 'test-path';

/**
 * Returns a mock route for testing purposes.
 * @param  {string} path? Default Value: 'test-path'
 * @param  {Route[]} children?
 */
export function getTestRoute(path?: string, children?: Route[]): Route {
  const route = {
    path: doesExist(path) ? path : TEST_PATH,
  } as Route;

  if (doesExist(children)) {
    route.children = children;
  }

  return route;
}
