import { Injectable } from '@angular/core';
import { DataState } from '@shared/model/dao/data-state.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable } from 'rxjs';

/** Central API for accessing, importing, and persisting application configurations */
@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  // provide constant for supported keys
  static readonly PERSISTENCE_TYPES = {
    treasureArticle: 'greg-treasure-article',
    treasureType: 'greg-treasure-type',
  };

  dataState$: Observable<DataState>;

  private dataStateSource = new BehaviorSubject<DataState>(new DataState());

  constructor() {
    this.dataState$ = this.dataStateSource.asObservable();
    this.refreshDataState();
  }

  // export to JSON
  // import from JSON

  /**
   * Puts a given object into persistent browser storage.
   *
   * @param  {string} key - the identifier of the value being stored
   * @param  {any} object - the object value being stored
   */
  persist(key: string, object: any): void {
    switch (key) {
      case DataManagerService.PERSISTENCE_TYPES.treasureArticle:
        this.persistTreasureArticle(object as TreasureArticle);
        break;
      case DataManagerService.PERSISTENCE_TYPES.treasureType:
        this.persistTreasureType(object as TreasureType);
        break;
      default:
        throw new Error(`Data type ${key} not currently supported.`);
    }
    this.refreshDataState();
  }

  /**
   * Persists a provided TreasureArticle to local storage.
   * If the specified article - by name - already exists in local storage,
   * will update the value instead.
   *
   * @param  {TreasureArticle} treasureArticle
   */
  private persistTreasureArticle(treasureArticle: TreasureArticle): void {
    const articles: TreasureArticle[] = this.retrieve<TreasureArticle[]>(
      DataManagerService.PERSISTENCE_TYPES.treasureArticle,
      []
    );
    const articleIndex: number = articles.findIndex(
      (article) => article.name === treasureArticle.name
    );
    if (articleIndex !== -1) {
      articles.splice(articleIndex, 1, treasureArticle);
    } else {
      articles.push(treasureArticle);
    }
    localStorage.setItem(
      DataManagerService.PERSISTENCE_TYPES.treasureArticle,
      JSON.stringify(articles)
    );
  }

  /**
   * Persists a provided TreasureType into local storage.
   * If the type already exists - by type identifier and system - will update the type
   * in storage instead.
   *
   * @param  {TreasureType} treasureType
   */
  private persistTreasureType(treasureType: TreasureType): void {
    const types: TreasureType[] = this.retrieve<TreasureType[]>(
      DataManagerService.PERSISTENCE_TYPES.treasureType,
      []
    );
    const typeIndex: number = types.findIndex(
      (type) =>
        type.type === treasureType.type && type.system === treasureType.system
    );
    if (typeIndex !== -1) {
      types.splice(typeIndex, 1, treasureType);
    } else {
      types.push(treasureType);
    }
    localStorage.setItem(
      DataManagerService.PERSISTENCE_TYPES.treasureType,
      JSON.stringify(types)
    );
  }

  /** Synchronizes current data state observable with fresh values from local storage */
  private refreshDataState() {
    this.dataStateSource.next(
      new DataState({
        treasureArticles: this.retrieve<TreasureArticle[]>(
          DataManagerService.PERSISTENCE_TYPES.treasureArticle,
          []
        ),
        treasureTypes: this.retrieve<TreasureType[]>(
          DataManagerService.PERSISTENCE_TYPES.treasureType,
          []
        ),
      } as DataState)
    );
  }

  /**
   * Retrieves a given value from local storage, as identified by a provided key.
   * If a stored value with the given key is not found, returns the defaultObject provided.
   *
   * @param  {string} key
   * @param  {T} defaultObject
   */
  private retrieve<T>(key: string, defaultObject: T): T {
    const value: string = localStorage.getItem(key) as string;
    return doesExist(value) ? (JSON.parse(value) as T) : defaultObject;
  }
}
