import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MapOrMagicControllerServiceService } from '../services/map-or-magic-controller-service/map-or-magic-controller-service.service';

@Component({
  selector: 'greg-magic-item-table-display',
  templateUrl: './magic-item-table-display.component.html',
  styleUrls: ['./magic-item-table-display.component.scss'],
})
export class MagicItemTableDisplayComponent implements OnInit {
  @ViewChild('listNameInput')
  listNameRef: ElementRef;

  listName: string;
  magicItemTable$ = this.controllerService.magicItemTable$.pipe(
    tap((table) => (this.listName = table.name))
  );

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {}

  clearTable(): void {
    this.controllerService.clearTable();
  }

  exportList(): void {
    this.controllerService.exportTable();
  }

  removeEntryAt(index: number): void {
    this.controllerService.removeEntryAt(index);
  }

  updateListName(): void {
    this.controllerService.setTableName(this.listName);
  }
}
