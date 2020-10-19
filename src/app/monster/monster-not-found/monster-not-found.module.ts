import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MonsterNotFoundComponent } from './monster-not-found/monster-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MonsterNotFoundComponent,
  },
];

@NgModule({
  declarations: [MonsterNotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class MonsterNotFoundModule {}
