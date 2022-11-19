import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-map-or-magic-list',
  templateUrl: './map-or-magic-list.component.html',
  styleUrls: ['./map-or-magic-list.component.scss'],
})
export class MapOrMagicListComponent implements OnInit, OnDestroy {
  @ViewChild('listNameInput')
  listNameInputRef: ElementRef;

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
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  updateListName(): void {
    const name: string = this.listNameInput.value;
    if (!this.controllerService.compareListName(name)) {
      this.controllerService.updateListName(name);
    }
  }
}
