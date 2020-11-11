import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterSharedModule } from '@encounter/encounter-shared/encounter-shared.module';
import { EncounterNotFoundComponent } from './encounter-not-found/encounter-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: EncounterNotFoundComponent,
  },
];

@NgModule({
  declarations: [EncounterNotFoundComponent],
  imports: [CommonModule, EncounterSharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EncounterNotFoundModule {}
