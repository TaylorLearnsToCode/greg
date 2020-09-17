import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EncounterNotFoundComponent } from './encounter-not-found/encounter-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: EncounterNotFoundComponent,
  },
];

@NgModule({
  declarations: [EncounterNotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EncounterModule {}
