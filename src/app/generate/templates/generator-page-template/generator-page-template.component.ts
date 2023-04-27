import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { AbstractRollableTable } from '@shared/model/framework/abstract-rollable-table.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'greg-generator-page-template',
  templateUrl: './generator-page-template.component.html',
  styleUrls: ['./generator-page-template.component.scss'],
})
export class GeneratorPageTemplateComponent implements OnInit {
  @Input() set persistenceType(type: string) {
    this._persistenceType = type;
    this.derivePersistenceTitle();
  }
  get persistenceType(): string {
    return this._persistenceType;
  }

  @Output() generateEvent = new EventEmitter();

  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  hasGenerated: boolean;
  persistenceTitle: string;
  rollableTableList$: Observable<any>;

  private _persistenceType: string;

  constructor(private dataService: DataManagerService) {
    this.rollableTableList$ = this.dataService.dataState$;
  }

  ngOnInit(): void {
    this.initializeRollableTableListStream();
    this.hasGenerated = false;
  }

  /**
   * Emits the specified table to a parent component for generation and display.
   *
   * @param  {AbstractRollableTable} list
   */
  generate(list: AbstractRollableTable): void {
    this.hasGenerated = true;
    this.generateEvent.emit(list);
  }

  /** Sets the persistence title according to the provided type. */
  private derivePersistenceTitle(): void {
    for (const typeKey of Object.keys(this.PERSISTENCE_TYPES)) {
      if ((this.PERSISTENCE_TYPES as any)[typeKey] === this.persistenceType) {
        this.persistenceTitle = typeKey + 's';
        break;
      }
    }
  }

  /**
   * Based on the input persistence type, attempts to isolate the target list from the data
   * manager state stream for display/use during generation.
   */
  private initializeRollableTableListStream(): void {
    const stateParam =
      Object.keys(this.PERSISTENCE_TYPES).find(
        (key) => (this.PERSISTENCE_TYPES as any)[key] === this.persistenceType
      ) + 's';
    this.rollableTableList$ = this.dataService.dataState$.pipe(
      map((state) => (state as any)[stateParam])
    );
  }
}
