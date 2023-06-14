import { SelectableSystem } from '@admin/model/selectable-system.model';
import { Component } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
import { bx } from '@assets/system-configs/system-bx';
import { lbb } from '@assets/system-configs/system-lbb';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { throwError } from '@shared/utilities/framework-util/framework.util';

@Component({
  selector: 'greg-select-systems',
  templateUrl: './select-systems.component.html',
  styleUrls: ['./select-systems.component.scss'],
})
export class SelectSystemsComponent {
  readonly supportedSystems: SelectableSystem[];

  private readonly SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  constructor(private dataService: DataManagerService) {
    this.supportedSystems = Object.keys(this.SUPPORTED_SYSTEMS).map(
      (key) =>
        new SelectableSystem({
          key,
          futureScope: key !== 'LBB',
        })
    );
  }

  loadSystem(system: SelectableSystem, replace?: boolean): void {
    let selectedSystem;
    switch (system.key) {
      case 'BX':
        selectedSystem = bx;
        break;
      case 'LBB':
        selectedSystem = lbb;
        break;
      default:
        throwError(`System ${system.key} is not yet avaialble for prime time.`);
    }
    if (replace) {
      this.dataService.clearAll();
    }
    this.dataService.persist('master', selectedSystem);
    alert(`${system.key} successfully loaded.`);
  }
}
