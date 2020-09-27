import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateEncounterViewState } from '../model/create-encounter-view-state.interface';
import { IEncounterTableAction } from '../model/encounter-table.model';
import { CreateEncounterFacadeService } from '../services/create-encounter-facade/create-encounter-facade.service';

@Component({
  selector: 'greg-create-encounter-table',
  templateUrl: './create-encounter-table.component.html',
  styleUrls: ['./create-encounter-table.component.scss'],
})
export class CreateEncounterTableComponent implements OnInit, OnDestroy {
  viewState$: Observable<ICreateEncounterViewState>;

  constructor(private facade: CreateEncounterFacadeService) {}

  ngOnInit(): void {
    this.facade.initialize();
    this.viewState$ = this.facade.createEncounterViewState$;
  }

  ngOnDestroy(): void {
    this.facade.destroy();
  }

  onEncounterTableAction(action: IEncounterTableAction): void {
    this.facade.handleEncounterTableAction(action);
  }
}
