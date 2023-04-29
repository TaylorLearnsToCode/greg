import { NavRoute } from '@shared/model/ui/nav-route.interface';
import { constructInstance } from '@shared/utilities/common-util/common.util';

export class AppComponentViewModel {
  headerSubtext: string = '';
  headerText: string = 'GREG - Guided Random Encounter Generator';
  mainStyles: object = { 'max-height': '100vh' };
  navRoutes: NavRoute[] = [];

  constructor(state?: any) {
    constructInstance(this, state);
  }
}
