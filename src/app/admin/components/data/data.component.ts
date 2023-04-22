import { Component } from '@angular/core';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';

@Component({
  selector: 'greg-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  constructor(private dataService: DataManagerService) {}
}
