import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GenerateDungeonComponent } from './components/generate-dungeon/generate-dungeon.component';
import { GenerateInspirationComponent } from './components/generate-inspiration/generate-inspiration.component';
import { GenerateLandingComponent } from './components/generate-landing/generate-landing.component';
import { GenerateMapHexComponent } from './components/generate-map-hex/generate-map-hex.component';
import { GenerateMonsterEncounterComponent } from './components/generate-monster-encounter/generate-monster-encounter.component';
import { GenerateTreasureFromTypeComponent } from './components/generate-treasure-from-type/generate-treasure-from-type.component';
import { GenerateTreasureMapComponent } from './components/generate-treasure-map/generate-treasure-map.component';
import { DisplayDungeonResultComponent } from './templates/display-dungeon-result/display-dungeon-result.component';
import { DisplayDungeonRoomPropertyComponent } from './templates/display-dungeon-room-property/display-dungeon-room-property.component';
import { DisplayEncounterResultComponent } from './templates/display-encounter-result/display-encounter-result.component';
import { DisplayTreasureResultsComponent } from './templates/display-treasure-results/display-treasure-results.component';
import { GeneratorPageTemplateComponent } from './templates/generator-page-template/generator-page-template.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateLandingComponent,
  },
  {
    path: 'dungeon',
    component: GenerateDungeonComponent,
  },
  {
    path: 'inspiration',
    component: GenerateInspirationComponent,
  },
  {
    path: 'map-hex',
    component: GenerateMapHexComponent,
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
    GenerateDungeonComponent,
    DisplayEncounterResultComponent,
    DisplayDungeonResultComponent,
    DisplayTreasureResultsComponent,
    DisplayDungeonRoomPropertyComponent,
    GenerateInspirationComponent,
    GenerateMapHexComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenerateModule {}
