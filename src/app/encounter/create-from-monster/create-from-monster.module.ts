import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CreateFromMonsterComponent } from './components/create-from-monster/create-from-monster.component';
import { MonsterListComponent } from './components/monster-list/monster-list.component';
import { EncounterListComponent } from './components/encounter-list/encounter-list.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFromMonsterComponent,
  },
];

@NgModule({
  declarations: [CreateFromMonsterComponent, MonsterListComponent, EncounterListComponent],
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateFromMonsterModule {}
