import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreasureList } from '@treasure/enter-treasure/model/treasure-list.model';
import { EnterTreasureControllerService } from '@treasure/enter-treasure/services/enter-treasure-controller/enter-treasure-controller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-treasure-list',
  templateUrl: './treasure-list.component.html',
  styleUrls: ['./treasure-list.component.scss'],
})
export class TreasureListComponent implements OnInit {
  @ViewChild('listImport')
  listImportElementRef: ElementRef;

  treasureList$: Observable<TreasureList>;

  private get listImportInput(): HTMLInputElement {
    return this.listImportElementRef.nativeElement as HTMLInputElement;
  }

  constructor(private controllerService: EnterTreasureControllerService) {}

  ngOnInit(): void {
    this.treasureList$ = this.controllerService.treasureList$;
  }

  exportList(): void {
    this.controllerService.exportList();
  }

  importSavedList(): void {
    this.controllerService.importSavedList(this.listImportInput.files[0]);
    this.listImportInput.value = '';
  }
}
