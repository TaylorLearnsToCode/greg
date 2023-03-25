import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ConfigureLandingComponent } from './components/configure-landing/configure-landing.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigureLandingComponent,
  },
];

/** Module to configure system, environment, and inputs for the generation of encounter data. */
@NgModule({
  declarations: [ConfigureLandingComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfigureModule {}
