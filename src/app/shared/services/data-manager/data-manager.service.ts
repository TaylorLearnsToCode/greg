import { Injectable } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { DataState } from '@shared/model/dao/data-state.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { WeaponPowerTable } from '@shared/model/treasure/weapon-power-table.model';
import {
  doesExist,
  insertOrReplace,
  removeOrWarn,
} from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImportExportService } from './import-export/import-export.service';

/** Central API for accessing, importing, and persisting application configurations */
@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  dataState$: Observable<DataState>;

  private dataStateSource = new BehaviorSubject<DataState>(new DataState());

  constructor(private importExportService: ImportExportService) {
    this.dataState$ = this.dataStateSource.asObservable();
    this.refreshDataState();
  }

  /**
   * Blanks a given key in browser storage and re-emits the new state.
   *
   * @param  {string} key
   */
  clear(key: string): void {
    localStorage.removeItem(key);
    this.refreshDataState();
  }

  /** Removes all  */
  clearAll(): void {
    Object.values(this.PERSISTENCE_TYPES).forEach((key) => this.clear(key));
  }

  /**
   * Removes a given object from browser storage, identified by a given key
   *
   * @param  {any} object
   * @param  {string} fromKey
   * @param  {string} identifier Optional - default "name"
   */
  delete(object: any, fromKey: string, identifier?: string): void {
    // TODO - genericize this. These methods are all the same logic with different variable names!
    switch (fromKey) {
      case this.PERSISTENCE_TYPES.magicItem:
        this.deleteMagicItem(object);
        break;
      case this.PERSISTENCE_TYPES.magicItemTable:
        this.deleteMagicItemTable(object);
        break;
      case this.PERSISTENCE_TYPES.treasureType:
        this.deleteTreasureType(object);
        break;
      default:
        console.warn(
          `Data type ${fromKey} not currently supported: defaulting to generic approach.`
        );
        this.deleteSavedItem(object, fromKey, identifier);
    }
  }

  /** Exports all saved state into a singular file */
  exportAll(): void {
    this.importExportService.exportObject(
      this.dataStateSource.value,
      'greg-master-state',
      'GREG-MASTER-CONFIG'
    );
  }

  /**
   * Exports a given state property, identified by a provided key, from
   * browser storage to JSON to the user's local machine
   *
   * @param  {string} key
   */
  exportFromStorage(key: string): void {
    const exportable = this.retrieve(key, null);
    this.importExportService.exportObject(
      exportable,
      key.toUpperCase(),
      'GREG-CONFIG'
    );
  }

  /**
   * Exports a given file to JSON format with some specified properties
   *
   * @param  {any} obj
   * @param  {string} fileName optional: default "export"
   * @param  {string} fileType optional: default "json"
   */
  exportObject(obj: any, fileName?: string, fileType?: string): void {
    this.importExportService.exportObject(obj, fileName, fileType);
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
      return this.importExportService.readFile<T>(file);
    } else {
      this.importExportService.readFile<T>(file).subscribe((value) => {
        if (Array.isArray(value)) {
          for (const valueItem of value) {
            this.persist(destination, valueItem);
          }
        } else {
          this.persist(destination, value);
        }
      });
    }
  }

  /**
   * Puts a single given object into persistent browser storage
   *
   * @param  {string} key - the identifier of the value being stored
   * @param  {any} object - the object value being stored
   */
  persist(key: string, object: any): void {
    switch (key) {
      case this.PERSISTENCE_TYPES.magicItem:
        this.persistMagicItem(object as MagicItem);
        break;
      case this.PERSISTENCE_TYPES.magicItemTable:
        this.persistMagicItemTable(object as ReferenceEntryTable);
        break;
      case this.PERSISTENCE_TYPES.magicWeaponPowerTable:
        this.persistMagicWeaponPowerTable(object as WeaponPowerTable);
        break;
      case this.PERSISTENCE_TYPES.treasureArticle:
        this.persistTreasureArticle(object as TreasureArticle);
        break;
      case this.PERSISTENCE_TYPES.treasureMap:
        this.persistTreasureMap(object as ReferenceEntryTable);
        break;
      case this.PERSISTENCE_TYPES.treasureMapRef:
        this.persistTreasureMapReference(object as TreasureArticle);
        break;
      case this.PERSISTENCE_TYPES.treasureType:
        this.persistTreasureType(object as TreasureType);
        break;
      case 'master':
        this.persisteMasterDataConfig(object as DataState);
        break;
      default:
        console.warn('Using default persistence function!');
        this.defaultPersistObject(object, key);
    }
    this.refreshDataState();
  }

  /**
   * Searches browser storage for a specific referenced article among a collection
   * grouped under the provided PERSISTENCE_TYPES key.
   *
   * @param  {string} reference
   * @param  {string} key
   */
  retrieveReference<T>(reference: string, key: string): T {
    let result: T = null as T;
    for (const item of this.retrieve<T[]>(key, [])) {
      if ((item as any).name === reference) {
        result = item;
      }
    }
    return result;
  }

  /**
   * For the list of items saved to browser storage identified by a provided key,
   * moves the item at the specified index one step in the indicated direction
   *
   * @param  {string} key The persistence key of the list to which the target belongs
   * @param  {number} index The index of the item to be shifted
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftListEntry(key: string, index: number, direction: string): void {
    let newIndex;
    switch (direction) {
      case 'up':
        newIndex = index - 1;
        break;
      case 'down':
        newIndex = index + 1;
        break;
      default:
        throw new Error(`Invalid direction ${direction} specified.`);
    }
    const savedList: any[] = this.retrieve(key);
    if (newIndex === -1 || newIndex === savedList.length) {
      return;
    }
    const targetItem = savedList.splice(index, 1)[0];
    savedList.splice(newIndex, 0, targetItem);
    this.clear(key);
    for (const item of savedList) {
      this.persist(key, item);
    }
  }

  /**
   * Attempts to upsert a provided object into the stored data array of the provided
   * persistence type key.
   *
   * @param  {any} object
   * @param  {string} key
   */
  private defaultPersistObject(object: any, key: string): void {
    const objects: any[] = this.retrieve(key);
    insertOrReplace(object, objects);
    localStorage.setItem(key, JSON.stringify(objects));
  }

  /**
   * Removes the target magic item from the magic item collection
   *
   * @param  {MagicItem} item
   */
  private deleteMagicItem(item: MagicItem): void {
    const items: MagicItem[] = this.retrieve<MagicItem[]>(
      this.PERSISTENCE_TYPES.magicItem
    );
    removeOrWarn(item, items);
    localStorage.setItem(
      this.PERSISTENCE_TYPES.magicItem,
      JSON.stringify(items)
    );
    this.refreshDataState();
  }

  /**
   * Removes a magic item table from the magic item table collection
   *
   * @param  {ReferenceEntryTable} table
   */
  private deleteMagicItemTable(table: ReferenceEntryTable): void {
    const tables: ReferenceEntryTable[] = this.retrieve<ReferenceEntryTable[]>(
      this.PERSISTENCE_TYPES.magicItemTable
    );
    removeOrWarn(table, tables, 'name,system');
    localStorage.setItem(
      this.PERSISTENCE_TYPES.magicItemTable,
      JSON.stringify(tables)
    );
    this.refreshDataState();
  }

  /**
   * Removes a target treasure type from the treasure type collection
   *
   * @param  {TreasureType} type
   */
  private deleteTreasureType(type: TreasureType): void {
    const types: TreasureType[] = this.retrieve<TreasureType[]>(
      this.PERSISTENCE_TYPES.treasureType
    );
    removeOrWarn(type, types, 'type,system');
    localStorage.setItem(
      this.PERSISTENCE_TYPES.treasureType,
      JSON.stringify(types)
    );
    this.refreshDataState();
  }

  /**
   * Removes a target item, identified by an optional identifier: default 'name',
   * from its local storage collection, identified by a mandatory provided key, and
   * then calls for a refresh of the data state.
   *
   * @param  {T} item
   * @param  {string} key
   * @param  {string} identifier?
   */
  private deleteSavedItem<T>(item: T, key: string, identifier?: string): void {
    const items: T[] = this.retrieve<T[]>(key);
    removeOrWarn(item, items, identifier);
    localStorage.setItem(key, JSON.stringify(items));
    this.refreshDataState();
  }

  /**
   * Persists a provided MagicItem to local storage.
   * If the specified article - by name - already exists in local storage,
   * will update the value instead.
   *
   * @param  {MagicItem} magicItem
   */
  private persistMagicItem(magicItem: MagicItem): void {
    const items: MagicItem[] = this.retrieve<MagicItem[]>(
      this.PERSISTENCE_TYPES.magicItem
    );
    insertOrReplace<MagicItem>(magicItem, items);
    localStorage.setItem(
      this.PERSISTENCE_TYPES.magicItem,
      JSON.stringify(items)
    );
  }

  /**
   * Persists a provided MagicItemTable to local storage.
   * If the specified table - by name and system - already exists in local storage,
   * will update the value instead.
   *
   * @param  {ReferenceEntryTable} table
   */
  private persistMagicItemTable(table: ReferenceEntryTable): void {
    const tables: ReferenceEntryTable[] = this.retrieve<ReferenceEntryTable[]>(
      this.PERSISTENCE_TYPES.magicItemTable
    );
    insertOrReplace<ReferenceEntryTable>(table, tables, 'name,system');
    localStorage.setItem(
      this.PERSISTENCE_TYPES.magicItemTable,
      JSON.stringify(tables)
    );
  }

  /**
   * Persists a provided WeaponPowerTable to local storage.
   * If the specified table - by name and system - already exists in local storage,
   * will update the value instead.
   *
   * @param  {WeaponPowerTable} table
   */
  private persistMagicWeaponPowerTable(table: WeaponPowerTable): void {
    const tables: WeaponPowerTable[] = this.retrieve<WeaponPowerTable[]>(
      this.PERSISTENCE_TYPES.magicWeaponPowerTable
    );
    insertOrReplace<WeaponPowerTable>(table, tables, 'name,system');
    localStorage.setItem(
      this.PERSISTENCE_TYPES.magicWeaponPowerTable,
      JSON.stringify(tables)
    );
  }

  /**
   * Resets local browser storage to the provided master config.
   *
   * @param  {DataState} config
   */
  private persisteMasterDataConfig(config: DataState): void {
    let configKey: string;
    for (const key of Object.keys(config)) {
      configKey = (this.PERSISTENCE_TYPES as any)[
        key.substring(0, key.length - 1)
      ];
      for (const item of (config as any)[key]) {
        this.persist(configKey, item);
      }
    }
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
      this.PERSISTENCE_TYPES.treasureArticle
    );
    insertOrReplace(treasureArticle, articles);
    localStorage.setItem(
      this.PERSISTENCE_TYPES.treasureArticle,
      JSON.stringify(articles)
    );
  }

  /**
   * Persists a provided ReferenceEntryTable to local storage on the user's machine.
   * If the specified map - by name and system - already exists in local storage,
   * will update the value instead.
   *
   * @param  {ReferenceEntryTable} map
   */
  private persistTreasureMap(map: ReferenceEntryTable): void {
    const maps: ReferenceEntryTable[] = this.retrieve<ReferenceEntryTable[]>(
      this.PERSISTENCE_TYPES.treasureMap
    );
    insertOrReplace(map, maps, 'name,system');
    localStorage.setItem(
      this.PERSISTENCE_TYPES.treasureMap,
      JSON.stringify(maps)
    );
  }

  /**
   * Persists a provided TreasureArticle to local storage as a Treasure Map Reference.
   * If the specified article - by name - already exists in local storage,
   * will update the value instead.
   *
   * @param  {TreasureArticle} reference
   */
  private persistTreasureMapReference(reference: TreasureArticle): void {
    const references: TreasureArticle[] = this.retrieve<TreasureArticle[]>(
      this.PERSISTENCE_TYPES.treasureMapRef
    );
    insertOrReplace(reference, references);
    localStorage.setItem(
      this.PERSISTENCE_TYPES.treasureMapRef,
      JSON.stringify(references)
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
      this.PERSISTENCE_TYPES.treasureType
    );
    insertOrReplace(treasureType, types, 'type,system');
    localStorage.setItem(
      this.PERSISTENCE_TYPES.treasureType,
      JSON.stringify(types)
    );
  }

  /** Synchronizes current data state observable with fresh values from local storage */
  private refreshDataState() {
    const dataState: DataState = new DataState();

    for (const key of Object.keys(this.PERSISTENCE_TYPES)) {
      (dataState as any)[`${key}s`] = this.retrieve(
        (this.PERSISTENCE_TYPES as any)[key]
      );
    }

    this.dataStateSource.next(dataState);
  }

  /**
   * Retrieves a given value from local storage, as identified by a provided key.
   * If a stored value with the given key is not found, returns the defaultObject provided.
   *
   * @param  {string} key
   * @param  {T} defaultObject - optional
   */
  private retrieve<T>(key: string, defaultObject?: T): T {
    const value: string = localStorage.getItem(key) as string;
    const returnDefault: T =
      defaultObject == undefined ? ([] as T) : defaultObject;
    return doesExist(value) ? (JSON.parse(value) as T) : returnDefault;
  }
}
