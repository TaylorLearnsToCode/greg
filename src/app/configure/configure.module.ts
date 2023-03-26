import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ConfigureLandingComponent } from './components/configure-landing/configure-landing.component';
import { ConfigureTreasureTypeTableComponent } from './components/configure-treasure-type-table/configure-treasure-type-table.component';
import { ConfigureTreasureTypeComponent } from './components/configure-treasure-type/configure-treasure-type.component';
import { DiceRolledFormComponent } from './templates/dice-rolled-form/dice-rolled-form.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigureLandingComponent,
  },
  {
    path: 'treasure-type',
    component: ConfigureTreasureTypeComponent,
  },
  {
    path: 'treasure-type-table',
    component: ConfigureTreasureTypeTableComponent,
  },
];

/** Module to configure system, environment, and inputs for the generation of encounter data. */
@NgModule({
  declarations: [
    ConfigureLandingComponent,
    ConfigureTreasureTypeTableComponent,
    ConfigureTreasureTypeComponent,
    DiceRolledFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfigureModule {}
