import { Component, OnInit } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { DungeonResult } from '@generate/model/dungeon-result.model';
import { GenerateDungeonService } from '@generate/services/generate-dungeon/generate-dungeon.service';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { sortByField } from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'greg-generate-dungeon',
  templateUrl: './generate-dungeon.component.html',
  styleUrls: ['./generate-dungeon.component.scss'],
})
export class GenerateDungeonComponent implements OnInit {
  dungeonLevel: number = 1;
  dungeonResult$: Observable<any>;
  monsterEncounterList$: Observable<ReferenceEntryTable[]>;
  noRooms: number = 0;
  stockingListRef: string = '';
  get supportedSystemKeys(): string[] {
    return Object.keys(SUPPORTED_SYSTEMS);
  }
  supportedSystem(key: string): string {
    return (SUPPORTED_SYSTEMS as any)[key];
  }
  system: string = '';

  private dungeonResultSource = new BehaviorSubject<DungeonResult | null>(null);

  constructor(
    private dataService: DataManagerService,
    private dungeonService: GenerateDungeonService
  ) {}

  ngOnInit(): void {
    this.dungeonResult$ = this.dungeonResultSource.asObservable();
    this.monsterEncounterList$ = this.dataService.dataState$.pipe(
      map((state) => {
        const list = state.monsterEncounterLists.map(
          (t) => new ReferenceEntryTable(t)
        );
        sortByField(list);
        return list;
      })
    );
  }

  clearForm(): void {
    alert('Implement this next!');
  }

  generateDungeon(): void {
    this.dungeonResultSource.next(
      this.dungeonService.generateDungeon(
        this.noRooms,
        this.dungeonLevel,
        this.stockingListRef
      )
    );
  }

  updateSystemSelection(event: Event): void {
    this.dungeonService.setSystemSelection(
      (event.target as HTMLSelectElement).value
    );
  }

  useList(list: ReferenceEntryTable): void {
    this.stockingListRef = list.name;
    if (list.system) {
      this.setSystem(list.system);
    }
  }

  private setSystem(newSystem: string): void {
    this.system = newSystem;
    this.dungeonService.setSystemSelection(newSystem);
  }
}
