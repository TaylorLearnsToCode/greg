import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEncounterTableComponent } from '@encounter/create-encounter-table/create-encounter-table/create-encounter-table.component';
import { EncounterSharedModule } from '@encounter/encounter-shared/encounter-shared.module';
import { ConfigureDiceRolledComponent } from './components/configure-dice-rolled/configure-dice-rolled.component';
import { ConfigureEncounterTableComponent } from './components/configure-encounter-table/configure-encounter-table.component';
import { CreateEncounterActionsComponent } from './components/create-encounter-actions/create-encounter-actions.component';
import { DisplayTablePrintComponent } from './components/display-table-print/display-table-print.component';
import { DisplayTableWebComponent } from './components/display-table-web/display-table-web.component';
import { EditEncounterFormComponent } from './components/edit-encounter-form/edit-encounter-form.component';
import { EditEncounterTableComponent } from './components/edit-encounter-table/edit-encounter-table.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEncounterTableComponent,
  },
];

@NgModule({
  declarations: [
    ConfigureDiceRolledComponent,
    ConfigureEncounterTableComponent,
    CreateEncounterActionsComponent,
    CreateEncounterTableComponent,
    DisplayTablePrintComponent,
    DisplayTableWebComponent,
    EditEncounterTableComponent,
    EditEncounterFormComponent,
  ],
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes), EncounterSharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEncounterTableModule {}
