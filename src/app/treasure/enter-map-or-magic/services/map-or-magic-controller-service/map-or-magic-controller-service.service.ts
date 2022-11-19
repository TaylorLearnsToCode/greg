import { Injectable } from '@angular/core';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { MagicItem } from '@treasure/treasure-common/model/magic-item.model';
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

  private itemListSource: BehaviorSubject<MagicItem[]> = new BehaviorSubject(
    []
  );
  private get itemList(): MagicItem[] {
    return cloneObject(this.itemListSource.value);
  }
  private set itemList(newList: MagicItem[]) {
    this.itemListSource.next(newList);
  }

  itemList$: Observable<MagicItem[]> = this.itemListSource.asObservable();
  listName$: Observable<string> = this.listNameSource.asObservable();

  constructor() {}

  addToList(newItem: MagicItem): void {
    const nextList = this.itemList;
    nextList.push(newItem);
    this.itemList = nextList;
  }

  compareListName(newName: string): boolean {
    return newName === this.listName;
  }

  updateListName(newName: string): void {
    if (doesExist(newName)) {
      this.listName = newName;
    }
  }
}
