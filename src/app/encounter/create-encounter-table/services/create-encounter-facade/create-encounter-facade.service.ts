import { Injectable } from '@angular/core';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '@encounter/create-encounter-table/model/encounter-table.model';
import { Encounter } from '@encounter/create-encounter-table/model/encounter.model';
import { formValueToEncounterTable } from '@encounter/create-encounter-table/utilities/encounter-conversion/encounter-conversion.util';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { ExportService } from '@shared/services/export/export.service';
import {
  cloneObject,
  deepFreeze,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ICreateEncounterViewState } from '../../model/create-encounter-view-state.interface';

/** Controller/Delegator service for encounter creation logic */
@Injectable({
  providedIn: 'root',
})
export class CreateEncounterFacadeService {
  /** Stream containing current encounter view state. */
  createEncounterViewState$: Observable<ICreateEncounterViewState>;

  /** Destruction subject to signal termination of observables when the using component is destroyed. */
  private destroySource = new Subject<void>();
  /** Private source subject for encounter table view state property. */
  private encounterTableSource = new BehaviorSubject<EncounterTable>(null);
  /**
   * Private accessor for current encounter table.
   * <i>On read</i> - returns a new instance of the same value.
   */
  private get encounterTable(): EncounterTable {
    return cloneObject(this.encounterTableSource.value);
  }
  /**
   * Private accessor for current encounter table.
   * <i>On write</i> - writes an immutable object matching the value assigned.
   */
  private set encounterTable(encounterTable: EncounterTable) {
    deepFreeze(formValueToEncounterTable(encounterTable));
    this.encounterTableSource.next(encounterTable);
  }

  /**
   * Create Encounter Facade Service Constructor
   * @param  {ExportService} privateexporService
   */
  constructor(private exportService: ExportService) {}

  /** Destruction method: terminates active processes in the service. */
  destroy(): void {
    this.destroySource.next();
  }

  /**
   * Delegator method for IEncounterTableActions, supporting all action options
   * defined in the EncounterTableActions enum.
   * @param  {IEncounterTableAction} action
   */
  handleEncounterTableAction(action: IEncounterTableAction): void {
    switch (action.action) {
      case EncounterTableActions.EXPORT_JSON: {
        const title: string = action.payload.title;
        this.exportService.exportAsJson(action.payload, title);
        break;
      }
      case EncounterTableActions.UPDATE_DICE_ROLLED: {
        this.updateDiceRolled(action.payload);
        break;
      }
      case EncounterTableActions.UPDATE_TABLE: {
        this.updateDiceRolled(action.payload.diceRolled);
        this.updateEncounters(action.payload.encounters);
        this.updateTitle(action.payload.title);
        break;
      }
      default: {
        throw new Error(`Unsupported action: ${action.action}`);
      }
    }
  }

  /**
   * Initializer method: defines initial view and service state.
   * <i>This method must be called before subscribing to createEncounterViewState$!</i>
   */
  initialize(): void {
    this.encounterTable = new EncounterTable();
    this.createEncounterViewState$ = combineLatest([
      this.encounterTableSource.asObservable(),
    ]).pipe(
      map(([encounterTable]) => {
        return { encounterTable } as ICreateEncounterViewState;
      }),
      takeUntil(this.destroySource)
    );
  }

  /**
   * Clones the current encounter table, replaces the diceRolled property with a provided
   * DiceRolled array, and publishes the result to state.
   * @param  {DiceRolled[]} diceRolled
   */
  private updateDiceRolled(diceRolled: DiceRolled[]): void {
    const nextEncounterTable = this.encounterTable;
    nextEncounterTable.diceRolled = diceRolled;
    this.encounterTable = nextEncounterTable;
  }

  /**
   * Clones the current encounter table, replaces the title property with a provided title,
   * if found, and publishes the result to state.
   * @param  {string} title
   */
  private updateTitle(title: string): void {
    if (doesExist(title)) {
      const nextEncounterTable = this.encounterTable;
      nextEncounterTable.title = title;
      this.encounterTable = nextEncounterTable;
    }
  }

  /**
   * Clones the current encounter table, replaces the encounters property with a provided
   * Encounter array, and publishes the result to state.
   * @param  {Encounter[]} encounters
   */
  private updateEncounters(encounters: Encounter[]): void {
    const nextEncounterTable = this.encounterTable;
    const newEncounters: Encounter[] = cloneObject(encounters);
    nextEncounterTable.encounters = encounters;
    this.encounterTable = nextEncounterTable;
  }
}
