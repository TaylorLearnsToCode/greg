import { Injectable } from '@angular/core';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapOrMagicControllerServiceService {
  private listNameSource: BehaviorSubject<string> = new BehaviorSubject('');
  private get listName(): string {
    return cloneObject(this.listNameSource.value);
  }
  private set listName(newName: string) {
    this.listNameSource.next(newName);
  }

  listName$: Observable<string> = this.listNameSource.asObservable();

  constructor() {}

  compareListName(newName: string): boolean {
    return newName === this.listName;
  }

  updateListName(newName: string): void {
    if (doesExist(newName)) {
      this.listName = newName;
    }
  }
}
