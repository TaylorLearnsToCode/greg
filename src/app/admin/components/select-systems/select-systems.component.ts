import { SelectableSystem } from '@admin/model/selectable-system.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';
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

  constructor(
    private dataService: DataManagerService,
    private httpClient: HttpClient
  ) {
    this.supportedSystems = Object.keys(this.SUPPORTED_SYSTEMS).map(
      (key) =>
        new SelectableSystem({
          key,
          futureScope: key !== 'LBB',
        })
    );
  }

  loadSystem(system: SelectableSystem, replace?: boolean): void {
    if (system.futureScope) {
      alert(`System ${system.key} is not yet avaialble for prime time.`);
      return;
    }

    let configLocation: string = '../../../../assets/system-configs/';
    switch (system.key) {
      case 'LBB':
        configLocation += 'system-lbb.GREG-MASTER-CONFIG';
        break;
      default:
        throwError(`System ${system.key} not found`);
    }
    this.httpClient.get(configLocation).subscribe((config) => {
      if (replace) {
        this.dataService.clearAll();
      }
      this.dataService.persist('master', config);
    });
  }
}
