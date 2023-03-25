import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TreasureListEntry } from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { TreasureList } from '@treasure/enter-treasure/model/treasure-list.model';
import { EnterTreasureControllerService } from '@treasure/enter-treasure/services/enter-treasure-controller/enter-treasure-controller.service';
import { RollTreasureControllerService } from '@treasure/enter-treasure/services/roll-treasure-controller/roll-treasure-controller.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-treasure-list',
  templateUrl: './treasure-list.component.html',
  styleUrls: ['./treasure-list.component.scss'],
})
export class TreasureListComponent implements OnInit, OnDestroy {
  @ViewChild('listImport')
  listImportElementRef: ElementRef;

  treasureList$: Observable<TreasureList>;
  toggleButtonText: string;
  areEnteringTreasure: boolean;

  private destroySource: Subject<void>;
  private get listImportInput(): HTMLInputElement {
    return this.listImportElementRef.nativeElement as HTMLInputElement;
  }

  constructor(
    private controllerService: EnterTreasureControllerService,
    private rollTreasureService: RollTreasureControllerService
  ) {}

  ngOnInit(): void {
    this.treasureList$ = this.controllerService.treasureList$;
    this.destroySource = new Subject();
    this.rollTreasureService.areEnteringTreasure$
      .pipe(
        tap((are) => {
          this.toggleButtonText = are ? 'Roll Treasure' : 'Enter Treasure';
          this.areEnteringTreasure = are;
        }),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  clearList(): void {
    this.controllerService.clearList();
  }

  editRecord(index: number): void {
    this.controllerService.editEntryAt(index);
  }

  exportList(): void {
    this.controllerService.exportList();
  }

  importSavedList(): void {
    this.controllerService.importSavedList(this.listImportInput.files[0]);
    this.listImportInput.value = '';
  }

  removeRecord(index: number): void {
    this.controllerService.removeRecordAt(index);
  }

  rollEntry(entry: TreasureListEntry): void {
    this.rollTreasureService.rollTreasure(entry);
  }

  toggleAreEnteringTreasure(): void {
    this.rollTreasureService.toggleAreEnteringTreasure();
  }
}
