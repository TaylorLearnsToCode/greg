import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GenerateLandingComponent } from './components/generate-landing/generate-landing.component';
import { GenerateTreasureFromTypeComponent } from './components/generate-treasure-from-type/generate-treasure-from-type.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateLandingComponent,
  },
  {
    path: 'treasure-from-type',
    component: GenerateTreasureFromTypeComponent,
  },
];

/** Module to leverage current configuration to generate encounter data. */
@NgModule({
  declarations: [GenerateLandingComponent, GenerateTreasureFromTypeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenerateModule {}
