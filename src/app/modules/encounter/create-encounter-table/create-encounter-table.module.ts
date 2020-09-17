import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CreateEncounterTableComponent } from './create-encounter-table/create-encounter-table.component';
import { EncounterTableFormComponent } from './encounter-table-form/encounter-table-form.component';
import { EncounterTableDisplayComponent } from './encounter-table-display/encounter-table-display.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEncounterTableComponent,
  },
];

@NgModule({
  declarations: [CreateEncounterTableComponent, EncounterTableFormComponent, EncounterTableDisplayComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEncounterTableModule {}
