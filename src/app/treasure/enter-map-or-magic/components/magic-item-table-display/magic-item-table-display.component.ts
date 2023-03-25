import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';
import { MagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-magic-item-table-display',
  templateUrl: './magic-item-table-display.component.html',
  styleUrls: ['./magic-item-table-display.component.scss'],
})
export class MagicItemTableDisplayComponent implements OnInit, OnDestroy {
  @ViewChild('listNameInput')
  listNameRef: ElementRef;
  @ViewChild('importListInput')
  importListInputRef: ElementRef;

  private destroySource: Subject<void>;

  enteringMagicItem: boolean;
  listName: string;
  magicItemTable$: Observable<MagicItemTable>;

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {
    this.destroySource = new Subject();
    this.controllerService.enteringMagicItem$
      .pipe(
        tap((val) => (this.enteringMagicItem = val)),
        takeUntil(this.destroySource)
      )
      .subscribe();
    this.magicItemTable$ = this.controllerService.magicItemTable$.pipe(
      tap((table) => (this.listName = table.name))
    );
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

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

  toggleMapOrMagic(): void {
    this.controllerService.toggleEntryItem();
  }

  updateListName(): void {
    this.controllerService.setTableName(this.listName);
  }
}
