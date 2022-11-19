import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';

@Component({
  selector: 'greg-magic-item-table-display',
  templateUrl: './magic-item-table-display.component.html',
  styleUrls: ['./magic-item-table-display.component.scss'],
})
export class MagicItemTableDisplayComponent implements OnInit {
  @ViewChild('listNameInput')
  listNameRef: ElementRef;
  @ViewChild('importListInput')
  importListInputRef: ElementRef;

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

  importList(): void {
    this.controllerService.importTable(
      this.importListInputRef.nativeElement.files[0]
    );
    this.importListInputRef.nativeElement.value = '';
  }

  removeEntryAt(index: number): void {
    this.controllerService.removeEntryAt(index);
  }

  updateListName(): void {
    this.controllerService.setTableName(this.listName);
  }
}
