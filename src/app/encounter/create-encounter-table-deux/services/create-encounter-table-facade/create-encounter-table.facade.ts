import { Injectable } from '@angular/core';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table-deux/model/create-encounter-table-action.interface';
import { CreateEncounterTableActions } from '@encounter/create-encounter-table-deux/model/create-encounter-table-actions.enum';
import {
  buildCreateEncounterViewState$,
  ICreateEncounterTableViewState,
} from '@encounter/create-encounter-table-deux/model/create-encounter-view-state.interface';
import { EncounterTable } from '@encounter/create-encounter-table-deux/model/encounter-table.model';
import { Encounter } from '@encounter/create-encounter-table-deux/model/encounter.model';
import { IUpsertEncounterDTO } from '@encounter/create-encounter-table-deux/model/upsert-encounter-dto.interface';
import { ExportService } from '@shared/services/export/export.service';
import {
  cloneObject,
  deepFreeze,
  doesExist,
  isEmpty,
} from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateEncounterTableFacade {
  private set action(action: CreateEncounterTableActions) {
    this.actionSource.next(action);
  }
  private actionSource = new BehaviorSubject<CreateEncounterTableActions>(null);
  /** @deprecate */
  private set activeEncounter(encounter: Encounter) {
    deepFreeze(encounter);
    this.activeEncounterSource.next(encounter);
  }
  private get activeEncounter(): Encounter {
    return new Encounter(cloneObject(this.activeEncounterSource.value));
  }
  private get activeEncounterIndex(): number {
    return this.activeEncounterIndexSource.value;
  }
  private set activeEncounterIndex(idx: number) {
    this.activeEncounterIndexSource.next(idx);
  }
  private activeEncounterIndexSource = new BehaviorSubject<number>(null);
  /** @deprecate */
  private activeEncounterSource = new BehaviorSubject<Encounter>(null);
  private activeTableSource = new BehaviorSubject<EncounterTable>(null);
  private destroySource = new Subject<void>();

  constructor(private exportService: ExportService) {}

  initialize(): Observable<ICreateEncounterTableViewState> {
    return buildCreateEncounterViewState$(
      this.actionSource.asObservable(),
      this.activeEncounterSource.asObservable(),
      this.activeEncounterIndexSource.asObservable(),
      this.activeTableSource.asObservable(),
      this.destroySource
    );
  }

  destroy(): void {
    this.destroySource.next();
  }

  handleCreateEncounterTableAction(action: ICreateEncounterTableAction): void {
    if (!doesExist(action)) {
      throw Error('No action passed to handle');
    } else {
      switch (action.action) {
        case CreateEncounterTableActions.EXPORT_ENCOUNTER:
        case CreateEncounterTableActions.EXPORT_TABLE: {
          this.onExport(action);
          break;
        }
        case CreateEncounterTableActions.RETURN_VIEW: {
          this.onReturnView();
          break;
        }
        case CreateEncounterTableActions.UPSERT_ENCOUNTER: {
          this.onUpsertEncounter(action.payload);
          break;
        }
        case CreateEncounterTableActions.UPSERT_SUBTABLE: {
          this.onUpsert(action);
          break;
        }
        default: {
          throw Error(`Unsupported action '${action.action}' detected.`);
        }
      }
    }
  }

  private onExport(action: ICreateEncounterTableAction): void {
    const midfix =
      action.action === CreateEncounterTableActions.EXPORT_ENCOUNTER
        ? 'encounter'
        : 'encounter-table';
    this.exportService.exportAsJson(
      action.payload,
      doesExist(action.payload.name) && !isEmpty(action.payload.name)
        ? `${action.payload.name}.${midfix}`
        : midfix
    );
  }

  private onReturnView(): void {
    this.activeEncounterIndex = null;
    this.action = CreateEncounterTableActions.RETURN_VIEW;
  }

  private onUpsertEncounter(dto: IUpsertEncounterDTO): void {
    // todo: remove the encounter from the DTO; we're not using it
    this.activeEncounter = dto.encounter;
    this.activeEncounterIndex = dto.index;
    this.action = CreateEncounterTableActions.UPSERT_ENCOUNTER;
  }

  private onUpsert(action: ICreateEncounterTableAction): void {
    this.activeEncounterIndex = action.payload;
    this.action = action.action;
  }
}
