import { Component, ElementRef, ViewChild } from '@angular/core';
import { LAbstractTable } from '@configure/model/TEMP/legacy-abstract-table.model';
import { LMagicItemTable } from '@configure/model/TEMP/legacy-magic-item-table.model';
import { LMagicItem } from '@configure/model/TEMP/legacy-magic-item.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { PageDisplayMode } from '@shared/model/ui/page-display-mode.enum';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-temp-convert-legacy',
  templateUrl: './temp-convert-legacy.component.html',
  styleUrls: ['./temp-convert-legacy.component.scss'],
})
/* NEXT GOAL: convert the old magic item lists to the new format */
export class TempConvertLegacyComponent {
  @ViewChild('importInput') importInputRef: ElementRef;

  readonly singlemode = PageDisplayMode.SINGLE;

  get importInput(): HTMLInputElement {
    return this.importInputRef.nativeElement as HTMLInputElement;
  }
  legacyItemTable: LMagicItemTable = {} as LMagicItemTable;
  magicItems: MagicItem[] = [];

  constructor(private dataService: DataManagerService) {}

  convert(): void {
    this.reset();
    this.deriveItems(this.legacyItemTable);
  }

  import(): void {
    this.importInput.click();
  }

  onImport(): void {
    if (this.importInput.files?.length) {
      (
        this.dataService.import<LMagicItemTable>(
          this.importInput.files[0]
        ) as Observable<LMagicItemTable>
      ).subscribe((val) => {
        this.legacyItemTable = val;
        this.importInput.value = '';
      });
    }
  }

  reset(): void {
    this.magicItems = [];
  }

  private deriveItems(table: LMagicItemTable): void {
    let itemRef: LMagicItem | LAbstractTable;
    for (const entry of table.entries) {
      itemRef = entry.item;
      if (!doesExist((itemRef as any).entries)) {
        this.magicItems.push(
          new MagicItem({
            name: itemRef.name,
            quantity: 1,
          } as MagicItem)
        );
      } else {
        this.deriveItems(itemRef as LMagicItemTable);
      }
    }
  }
}
