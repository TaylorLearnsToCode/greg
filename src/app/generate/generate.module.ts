import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GenerateLandingComponent } from './components/generate-landing/generate-landing.component';
import { GenerateMonsterEncounterComponent } from './components/generate-monster-encounter/generate-monster-encounter.component';
import { GenerateTreasureFromTypeComponent } from './components/generate-treasure-from-type/generate-treasure-from-type.component';
import { GenerateTreasureMapComponent } from './components/generate-treasure-map/generate-treasure-map.component';
import { GeneratorPageTemplateComponent } from './templates/generator-page-template/generator-page-template.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateLandingComponent,
  },
  {
    path: 'monster-encounter',
    component: GenerateMonsterEncounterComponent,
  },
  {
    path: 'treasure-from-type',
    component: GenerateTreasureFromTypeComponent,
  },
  {
    path: 'treasure-map',
    component: GenerateTreasureMapComponent,
  },
];

/** Module to leverage current configuration to generate encounter data. */
@NgModule({
  declarations: [
    GenerateLandingComponent,
    GenerateTreasureFromTypeComponent,
    GenerateTreasureMapComponent,
    GeneratorPageTemplateComponent,
    GenerateMonsterEncounterComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenerateModule {}
