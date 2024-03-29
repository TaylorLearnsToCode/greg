import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ConfigureLandingComponent } from './components/configure-landing/configure-landing.component';
import { ConfigureMagicItemTableComponent } from './components/configure-magic-item-table/configure-magic-item-table.component';
import { ConfigureMagicItemComponent } from './components/configure-magic-item/configure-magic-item.component';
import { ConfigureMonsterEncounterListComponent } from './components/configure-monster-encounter-list/configure-monster-encounter-list.component';
import { ConfigureMonsterTypeComponent } from './components/configure-monster-type/configure-monster-type.component';
import { ConfigureTreasureListComponent } from './components/configure-treasure-list/configure-treasure-list.component';
import { ConfigureTreasureMapComponent } from './components/configure-treasure-map/configure-treasure-map.component';
import { ConfigureTreasureTypeComponent } from './components/configure-treasure-type/configure-treasure-type.component';
import { ConfigureWeaponPowerComponent } from './components/configure-weapon-power/configure-weapon-power.component';
import { BoundedRangeFormComponent } from './templates/bounded-range-form/bounded-range-form.component';
import { DiceRolledFormComponent } from './templates/dice-rolled-form/dice-rolled-form.component';
import { QuantifiableItemFormTemplateComponent } from './templates/quantifiable-item-form-template/quantifiable-item-form-template.component';
import { RollableTableTemplateComponent } from './templates/rollable-table-template/rollable-table-template.component';
import { TreasureArticleFormComponent } from './templates/treasure-article-form/treasure-article-form.component';

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
    path: 'monster-entry',
    component: ConfigureMonsterTypeComponent,
  },
  {
    path: 'monster-encounter-list',
    component: ConfigureMonsterEncounterListComponent,
  },
  {
    path: 'treasure-list',
    component: ConfigureTreasureListComponent,
  },
  {
    path: 'treasure-map',
    component: ConfigureTreasureMapComponent,
  },
  {
    path: 'treasure-type',
    component: ConfigureTreasureTypeComponent,
  },
  {
    path: 'weapon-power',
    component: ConfigureWeaponPowerComponent,
  },
];

/** Module to configure system, environment, and inputs for the generation of encounter data. */
@NgModule({
  declarations: [
    ConfigureLandingComponent,
    ConfigureTreasureTypeComponent,
    DiceRolledFormComponent,
    ConfigureMagicItemComponent,
    ConfigureMagicItemTableComponent,
    ConfigureTreasureMapComponent,
    BoundedRangeFormComponent,
    RollableTableTemplateComponent,
    ConfigureWeaponPowerComponent,
    ConfigureMonsterTypeComponent,
    QuantifiableItemFormTemplateComponent,
    ConfigureMonsterEncounterListComponent,
    TreasureArticleFormComponent,
    ConfigureTreasureListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfigureModule {}
