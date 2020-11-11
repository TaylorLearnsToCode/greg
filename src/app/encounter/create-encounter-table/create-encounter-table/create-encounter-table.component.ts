import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';
import { combineLatest, Observable } from 'rxjs';
import { ICreateEncounterTableAction } from '../model/create-encounter-table-action.interface';
import { CreateEncounterTableFacadeService } from '../services/create-encounter-table-facade/create-encounter-table-facade.service';

@Component({
  selector: 'greg-create-encounter-table',
  templateUrl: './create-encounter-table.component.html',
  styleUrls: ['./create-encounter-table.component.scss'],
})
export class CreateEncounterTableComponent implements OnInit, OnDestroy {
  /** Page display double-content, single column */
  readonly PAGE_DISPLAY_MODE = PageDisplayMode.STACKED;

  diceRolled$: Observable<DiceRolled[]>;
  combinedConfig$: Observable<Array<{}>>;
  combinedEncounters$: Observable<Array<{}>>;

  constructor(private facade: CreateEncounterTableFacadeService) {}

  ngOnInit(): void {
    if (this.facade.initialize()) {
      this.diceRolled$ = this.facade.diceRolled$;
      this.combinedConfig$ = combineLatest([
        this.facade.name$,
        this.facade.type$,
      ]);
      this.combinedEncounters$ = combineLatest([
        this.facade.diceRolled$,
        this.facade.encounterRollMapping$,
        this.facade.encounters$,
      ]);
    }
  }

  ngOnDestroy(): void {
    this.facade.destroy();
  }

  onCreateEncounterTableAction(event: ICreateEncounterTableAction): void {
    this.facade.handleCreateEnounterTableAction(event);
  }
}
