import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NestedMagicItemTableControllerService } from '@treasure/create-nested-magic-item-table/services/nested-magic-item-table-controller/nested-magic-item-table-controller.service';
import { NestedMagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'greg-display-nested-magic-item-table',
  templateUrl: './display-nested-magic-item-table.component.html',
  styleUrls: ['./display-nested-magic-item-table.component.scss'],
})
export class DisplayNestedMagicItemTableComponent implements OnInit {
  @ViewChild('tableNameInput')
  tableNameInputRef: ElementRef;

  nestedTable$: Observable<NestedMagicItemTable>;
  tableName: string;

  constructor(
    private controllerService: NestedMagicItemTableControllerService
  ) {}

  ngOnInit(): void {
    this.nestedTable$ = this.controllerService.nestedTable$.pipe(
      tap((nestedTable) => (this.tableName = nestedTable.name))
    );
  }

  updateTableName(): void {
    this.controllerService.setTableName(
      this.tableNameInputRef.nativeElement.value
    );
  }
}
