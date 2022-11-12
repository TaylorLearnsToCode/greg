import { Injectable } from '@angular/core';
import { WwwMonster } from '@shared/model/www-monster.model';
import { ExportService } from '@shared/services/export/export.service';
import { cloneObject } from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonsterControllerService {
  private monsterSource: BehaviorSubject<WwwMonster[]> = new BehaviorSubject(
    []
  );
  private get monsters(): WwwMonster[] {
    return cloneObject(this.monsterSource.value);
  }

  monster$: Observable<WwwMonster[]> = this.monsterSource.asObservable();

  constructor(private exportService: ExportService) {}

  addMonster(monster: WwwMonster): void {
    const monsters: WwwMonster[] = this.monsters;
    monsters.push(monster);
    this.monsterSource.next(monsters);
  }

  exportMonsters(): void {
    this.exportService.exportAsJson(this.monsters, 'monsters');
  }

  importMonsters(file: File) {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const newMonsters: WwwMonster[] = JSON.parse(result);
      if (this.monsters.length) {
        newMonsters.unshift(...this.monsters);
      }
      this.monsterSource.next(newMonsters);
    });
    fileReader.readAsText(file);
  }
}
