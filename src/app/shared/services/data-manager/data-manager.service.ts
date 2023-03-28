import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DataState } from '@shared/model/dao/data-state.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.dataState$ = this.dataStateSource.asObservable();
    this.refreshDataState();
  }

  // import from JSON

  /**
   * Blanks a given key in browser storage and re-emits the new state.
   *
   * @param  {string} key
   */
  clear(key: string): void {
    localStorage.removeItem(key);
    this.refreshDataState();
  }

  /**
   * Removes a given object from browser storage, identified by a given key
   *
   * @param  {any} object
   * @param  {string} fromKey
   */
  delete(object: any, fromKey: string): void {
    switch (fromKey) {
      case DataManagerService.PERSISTENCE_TYPES.treasureType:
        this.deleteTreasureType(object);
        break;
      default:
        throw new Error(`Data type ${fromKey} not currently supported.`);
    }
  }

  /**
   * Exports a given state property, identified by a provided key, from
   * browser storage to JSON to the user's local machine
   *
   * @param  {string} key
   */
  exportFromStorage(key: string): void {
    const exportable = this.retrieve(key, null);
    this.exportObject(exportable, key.toUpperCase(), 'GREG-CONFIG');
  }

  /**
   * @param  {any} obj
   * @param  {string} fileName optional: default "export"
   * @param  {string} fileType optional: default "json"
   */
  exportObject(obj: any, fileName?: string, fileType?: string): void {
    const a: HTMLAnchorElement = this.document.createElement('a');
    a.href = URL.createObjectURL(this.buildPayload(obj));
    a.download = `${this.deriveFileName(fileName)}.${this.deriveFileType(
      fileType
    )}`;
    a.target = '_blank';
    a.click();
  }

  /**
   * Loads a given File of genericized type into the system and conditionally
   * returns the value.
   *
   * * If a destination is specified, appends the file to browser storage at the
   *   provided destination and refreshes the data state
   * * If no destination is specified, returns a self-closing Observable which
   *   emits only the content of the file.
   *
   * @param  {File} file
   * @param  {string} destination optional
   * @returns Observable, if destination is not specified; void otherwise
   */
  import<T>(file: File, destination?: string): Observable<T> | void {
    if (destination == undefined || destination == null) {
      return this.readFile<T>(file);
    } else {
      this.readFile<T>(file).subscribe((value) => {
        switch (destination) {
          case DataManagerService.PERSISTENCE_TYPES.treasureType:
            for (const type of value as TreasureType[]) {
              this.persist(destination, type);
            }
            break;
          default:
            throw new Error(
              `Destination ${destination} is not currently supported.`
            );
        }
      });
    }
  }

  /**
   * Puts a given object into persistent browser storage
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
   * Converts a given object into a Blob for export to file.
   *
   * @param  {any} obj
   */
  private buildPayload(obj: any): Blob {
    if (!doesExist(obj)) {
      throw Error('No object provided for export');
    }
    return new Blob([JSON.stringify(obj)], {
      type: 'text/plain',
    });
  }

  /**
   * Removes a target treasure type from the treasure type collection.
   *
   * @param  {TreasureType} type
   */
  private deleteTreasureType(type: TreasureType): void {
    const types: TreasureType[] = this.retrieve<TreasureType[]>(
      DataManagerService.PERSISTENCE_TYPES.treasureType,
      []
    );
    const typeIndex: number = types.findIndex(
      (t) => t.type === type.type && t.system === type.system
    );
    if (typeIndex !== -1) {
      types.splice(typeIndex, 1);
    } else {
      console.warn(
        `Treasure type ${type.type} for system ${type.system} not found to remove!`
      );
    }
    localStorage.setItem(
      DataManagerService.PERSISTENCE_TYPES.treasureType,
      JSON.stringify(types)
    );
    this.refreshDataState();
  }

  /**
   * For a given file name, returns a space-less version of the name to be applied
   * to a given file for export.
   *
   * @param  {string} fileName optional: default "export"
   */
  private deriveFileName(fileName?: string): string {
    if (fileName == undefined) {
      fileName = 'export';
    }
    return doesExist(fileName) ? fileName.replaceAll(' ', '') : 'export';
  }

  /**
   * Based on a provided fileType argument, returns the file type to be applied
   * to a given file for import/export
   *
   * @param  {string} fileType optional: default "json"
   */
  private deriveFileType(fileType?: string): string {
    if (fileType == undefined) {
      fileType = 'json';
    }
    return doesExist(fileType)
      ? fileType.charAt(0) === '.'
        ? fileType.substring(1)
        : fileType
      : 'json';
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

  /**
   * For a provided File, returns a self-closing observable emitting
   * one result of type T.
   *
   * @param  {File} file
   */
  private readFile<T>(file: File): Observable<T> {
    const resultSource = new Subject<T>();
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: T = JSON.parse(fileReader.result as string);
      resultSource.next(result);
      resultSource.complete();
    });
    fileReader.readAsText(file);
    return resultSource.asObservable();
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
