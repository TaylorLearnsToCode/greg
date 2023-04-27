import { constructInstance } from '@shared/utilities/common-util/common.util';
import { NavRoute } from '@shared/model/ui/nav-route.interface';

export class AppComponentViewModel {
  headerSubtext: string = '';
  headerText: string = 'GREG - Guided Random Encounter Generator';
  navRoutes: NavRoute[] = [];

  constructor(state?: any) {
    constructInstance(this, state);
  }
}
