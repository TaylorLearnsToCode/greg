import { Injectable } from '@angular/core';
import { CreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.enum';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table/model/create-encounter-table-action.interface';
import { IUpdateConfigDto } from '@encounter/create-encounter-table/model/update-config-dto.interface';
import { EncounterLocation } from '@encounter/encounter-shared/model/encounter-locationS.enum';
import { EncounterTableType } from '@encounter/encounter-shared/model/encounter-table-types.enum';
import { EncounterTable } from '@encounter/encounter-shared/model/encounter-table.model';
import { Encounter } from '@encounter/encounter-shared/model/encounter.model';
import { BoundedRange } from '@shared/model/bounded-range.model';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { IRollMapping } from '@shared/model/roll-index-mapping.interface';
import {
  cloneObject,
  deepFreeze,
  doesExist,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { getRollRange } from '@shared/utilities/dice-roller/dice-roller.util';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CreateEncounterTableFacadeService {
  private get diceRolled(): DiceRolled[] {
    return [...this.diceRolledSource.value.map((dice) => new DiceRolled(dice))];
  }
  private set diceRolled(dice: DiceRolled[]) {
    deepFreeze(dice);
    this.diceRolledSource.next(dice);
  }
  private diceRolledSource = new BehaviorSubject<DiceRolled[]>(null);
  private destroySource = new Subject<void>();
  private get encounterRollMapping(): IRollMapping[] {
    return cloneObject(this.encounterRollMappingSource.value);
  }
  private set encounterRollMapping(newMapping: IRollMapping[]) {
    deepFreeze(newMapping);
    this.encounterRollMappingSource.next(newMapping);
  }
  private encounterRollMappingSource = new BehaviorSubject<IRollMapping[]>(
    null
  );
  private get encounters(): Array<Encounter | EncounterTable> {
    return cloneObject(this.encountersSource.value);
  }
  private set encounters(newEncounters: Array<Encounter | EncounterTable>) {
    deepFreeze(newEncounters);
    this.encountersSource.next(newEncounters);
  }
  private encountersSource = new BehaviorSubject<
    Array<Encounter | EncounterTable>
  >(null);
  private get location(): EncounterLocation {
    return cloneObject(this.locationSource.value) as EncounterLocation;
  }
  private set location(newLocation: EncounterLocation) {
    deepFreeze(newLocation);
    this.locationSource.next(newLocation);
  }
  private locationSource = new BehaviorSubject<EncounterLocation>(null);
  private get name(): string {
    return this.nameSource.value;
  }
  private set name(newName: string) {
    this.nameSource.next(newName);
  }
  private nameSource = new BehaviorSubject<string>(null);
  private get type(): EncounterTableType {
    return cloneObject(this.typeSource.value);
  }
  private set type(newType: EncounterTableType) {
    deepFreeze(newType);
    this.typeSource.next(newType);
  }
  private typeSource = new BehaviorSubject<EncounterTableType>(null);

  diceRolled$: Observable<DiceRolled[]>;
  encounterRollMapping$: Observable<IRollMapping[]>;
  encounters$: Observable<Array<Encounter | EncounterTable>>;
  location$: Observable<EncounterLocation>;
  name$: Observable<string>;
  type$: Observable<EncounterTableType>;

  constructor() {}

  destroy(): void {
    this.destroySource.next();
  }

  handleCreateEnounterTableAction(action: ICreateEncounterTableAction): void {
    switch (action.action) {
      case CreateEncounterTableAction.INFER_ENCOUNTERS: {
        this.inferEncounterTable();
        break;
      }
      case CreateEncounterTableAction.SAVE_CONFIG: {
        this.onSaveConfig(action.payload);
        break;
      }
      case CreateEncounterTableAction.SAVE_DICE_ROLLED: {
        this.diceRolled = action.payload;
        break;
      }
      case CreateEncounterTableAction.SAVE_ENCOUNTERS: {
        this.onSaveEncounters(action.payload);
        break;
      }
      default: {
        break;
      }
    }
  }

  initialize(): boolean {
    this.initializeSources();
    this.initializeStreams();
    return true;
  }

  /** @todo Clean Up! */
  private inferEncounterTable(): void {
    const diceRolled: DiceRolled[] = this.diceRolled;
    const encounters: Array<Encounter | EncounterTable> = this.encounters;
    const mapping: IRollMapping[] = this.encounterRollMapping;
    const type = this.type;
    let rollMappingRange: number[];

    if (!doesExist(diceRolled) || isEmpty(diceRolled)) {
      throw Error('DiceRolled is empty');
    }

    if (!doesExist(type) || type == EncounterTableType.UNSPECIFIED) {
      throw Error('Unable to infer table structure with UNSPECIFIED type');
    }

    if (type == EncounterTableType.NESTED) {
      alert('nested');
    } else if (type == EncounterTableType.STANDARD) {
      rollMappingRange = getRollRange(...diceRolled);
      let index: number;
      while (mapping.length < rollMappingRange.length) {
        index = mapping.length;
        mapping.push({
          index,
          roll: new BoundedRange({
            low: index + 1,
          } as BoundedRange),
        } as IRollMapping);
      }
      while (encounters.length < mapping.length) {
        encounters.push({} as EncounterTable);
      }
      this.encounters = encounters;
      this.encounterRollMapping = mapping;
    } else {
      throw Error(`Unspecified type ${type} detected`);
    }
  }

  private initializeSources(): void {
    const table = new EncounterTable();
    deepFreeze(table);
    this.diceRolled = table.diceRolled;
    this.encounterRollMapping = table.encounterRollMapping;
    this.encounters = table.encounters;
    this.location = table.location;
    this.name = table.name;
    this.type = EncounterTableType.UNSPECIFIED;
  }

  private initializeStreams(): void {
    this.diceRolled$ = this.diceRolledSource
      .asObservable()
      .pipe(takeUntil(this.destroySource));
    this.encounterRollMapping$ = this.encounterRollMappingSource
      .asObservable()
      .pipe(takeUntil(this.destroySource));
    this.encounters$ = this.encountersSource
      .asObservable()
      .pipe(takeUntil(this.destroySource));
    this.location$ = this.locationSource
      .asObservable()
      .pipe(takeUntil(this.destroySource));
    this.name$ = this.nameSource
      .asObservable()
      .pipe(takeUntil(this.destroySource));
    this.type$ = this.typeSource
      .asObservable()
      .pipe(takeUntil(this.destroySource));
  }

  private onSaveConfig(config: IUpdateConfigDto): void {
    this.location = config.location;
    this.name = config.name;
    this.type = config.type;
  }

  private onSaveEncounters(table: EncounterTable): void {
    this.encounters = table.encounters;
    this.encounterRollMapping = table.encounterRollMapping;
  }
}
