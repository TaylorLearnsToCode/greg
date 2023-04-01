import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ConfigureLandingComponent } from './components/configure-landing/configure-landing.component';
import { ConfigureMagicItemTableComponent } from './components/configure-magic-item-table/configure-magic-item-table.component';
import { ConfigureMagicItemComponent } from './components/configure-magic-item/configure-magic-item.component';
import { ConfigureTreasureMapComponent } from './components/configure-treasure-map/configure-treasure-map.component';
import { ConfigureTreasureTypeTableComponent } from './components/configure-treasure-type-table/configure-treasure-type-table.component';
import { ConfigureTreasureTypeComponent } from './components/configure-treasure-type/configure-treasure-type.component';
import { DiceRolledFormComponent } from './templates/dice-rolled-form/dice-rolled-form.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigureLandingComponent,
  },
  {
    path: 'magic-item',
    component: ConfigureMagicItemComponent,
  },
  {
    path: 'magic-item-table',
    component: ConfigureMagicItemTableComponent,
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
    ConfigureMagicItemComponent,
    ConfigureMagicItemTableComponent,
    ConfigureTreasureMapComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfigureModule {}
