import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateEncounterViewState } from '../../model/create-encounter-view-state.interface';
import { IEncounterTableAction } from '../../model/encounter-table.model';
import { CreateEncounterFacadeService } from '../../services/create-encounter-facade/create-encounter-facade.service';

/** UI template supporting the creation of encounter tables by the end user. */
@Component({
  selector: 'greg-create-encounter-table',
  templateUrl: './create-encounter-table.component.html',
  styleUrls: ['./create-encounter-table.component.scss'],
})
export class CreateEncounterTableComponent implements OnInit, OnDestroy {
  /** Stream containing the current view state. */
  viewState$: Observable<ICreateEncounterViewState>;

  /**
   * CreateEncounterTableComponent Constructor
   * @param  {CreateEncounterFacadeService} privatefacade
   */
  constructor(private facade: CreateEncounterFacadeService) {}

  /** Initialization life cycle method: initializes the facade service and assigns the viewState$. */
  ngOnInit(): void {
    this.facade.initialize();
    this.viewState$ = this.facade.createEncounterViewState$;
  }

  /** Destruction life cycle method: destroys the facade. */
  ngOnDestroy(): void {
    this.facade.destroy();
  }

  /**
   * Encounter table action emission handler: delegates the emitted {action} to the injected facade.
   * @param  {IEncounterTableAction} action
   */
  onEncounterTableAction(action: IEncounterTableAction): void {
    this.facade.handleEncounterTableAction(action);
  }
}
