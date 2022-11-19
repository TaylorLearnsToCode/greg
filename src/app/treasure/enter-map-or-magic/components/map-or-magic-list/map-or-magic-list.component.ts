import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';
import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-map-or-magic-list',
  templateUrl: './map-or-magic-list.component.html',
  styleUrls: ['./map-or-magic-list.component.scss'],
})
export class MapOrMagicListComponent implements OnInit, OnDestroy {
  @ViewChild('listNameInput')
  listNameInputRef: ElementRef;

  itemList$: Observable<MagicItem[]>;

  private destroySource: Subject<void> = new Subject();
  private get listNameInput(): HTMLInputElement {
    return this.listNameInputRef.nativeElement as HTMLInputElement;
  }

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {
    this.controllerService.listName$
      .pipe(
        tap((value: string) => (this.listNameInput.value = value)),
        takeUntil(this.destroySource)
      )
      .subscribe();
    this.itemList$ = this.controllerService.itemList$;
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  removeEntry(index: number): void {
    this.controllerService.removeItemAt(index);
  }

  updateListName(): void {
    const name: string = this.listNameInput.value;
    if (!this.controllerService.compareListName(name)) {
      this.controllerService.updateListName(name);
    }
  }
}
