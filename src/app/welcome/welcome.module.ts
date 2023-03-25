import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { WelcomeLandingComponent } from './components/welcome-landing/welcome-landing.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeLandingComponent,
  },
];

/** Welcome / Landing module */
@NgModule({
  declarations: [WelcomeLandingComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomeModule {}
