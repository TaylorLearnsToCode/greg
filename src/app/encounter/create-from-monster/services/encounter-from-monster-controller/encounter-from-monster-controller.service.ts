import { Injectable } from '@angular/core';
import { EncounterListEntry } from '@encounter/create-from-monster/model/encounter-list-entry';
import { BoundedRange } from '@shared/model/bounded-range.model';
import { WwwMonster } from '@shared/model/www-monster.model';
import { ExportService } from '@shared/services/export/export.service';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncounterFromMonsterControllerService {
  private encounterListSource: BehaviorSubject<EncounterListEntry[]> =
    new BehaviorSubject([]);
  private get encounterList(): EncounterListEntry[] {
    return cloneObject(this.encounterListSource.value);
  }

  encounterList$: Observable<EncounterListEntry[]> =
    this.encounterListSource.asObservable();

  constructor(private exportService: ExportService) {}

  clearEncounterList(): void {
    this.encounterListSource.next([]);
  }

  exportEncounterList(encounterList?: EncounterListEntry[]): void {
    if (doesExist(encounterList)) {
      this.encounterListSource.next(encounterList);
    }
    this.exportService.exportAsJson(this.encounterList, 'encounter-list');
  }

  importExistingList(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const newList: EncounterListEntry[] = JSON.parse(result);
      const nextList = this.encounterList;
      nextList.push(...newList);
      this.encounterListSource.next(nextList);
    });
    fileReader.readAsText(file);
  }

  importMonsterList(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const monsterList: WwwMonster[] = JSON.parse(result);
      const nextList: EncounterListEntry[] = this.encounterList;
      for (let monster of monsterList) {
        nextList.push({
          range: new BoundedRange(),
          encounter: monster,
        } as EncounterListEntry);
      }
      this.encounterListSource.next(nextList);
    });
    fileReader.readAsText(file);
  }
}
