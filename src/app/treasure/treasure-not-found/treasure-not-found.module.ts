import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TreasureNotFoundComponent } from './treasure-not-found/treasure-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: TreasureNotFoundComponent,
  },
];

@NgModule({
  declarations: [TreasureNotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class TreasureNotFoundModule {}
