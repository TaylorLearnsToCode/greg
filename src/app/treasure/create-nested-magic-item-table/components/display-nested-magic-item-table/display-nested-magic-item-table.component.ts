import { Component, OnInit } from '@angular/core';
import { NestedMagicItemTableControllerService } from '@treasure/create-nested-magic-item-table/services/nested-magic-item-table-controller/nested-magic-item-table-controller.service';
import {
  MagicItemTable,
  NestedMagicItemTable,
} from '@treasure/treasure-common/model/magic-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-display-nested-magic-item-table',
  templateUrl: './display-nested-magic-item-table.component.html',
  styleUrls: ['./display-nested-magic-item-table.component.scss'],
})
export class DisplayNestedMagicItemTableComponent implements OnInit {
  nestedTable$: Observable<NestedMagicItemTable>;

  constructor(
    private controllerService: NestedMagicItemTableControllerService
  ) {}

  ngOnInit(): void {
    this.nestedTable$ = this.controllerService.nestedTable$;
  }

  exportTable(): void {
    this.controllerService.exportTable();
  }

  isNestedTable(entry: MagicItemTable | NestedMagicItemTable): boolean {
    return entry instanceof NestedMagicItemTable;
  }

  removeEntryAt(index: number): void {
    this.controllerService.removeEntryAt(index);
  }
}
