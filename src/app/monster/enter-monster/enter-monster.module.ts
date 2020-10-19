import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { EnterMonsterComponent } from './enter-monster/enter-monster.component';
import { MonsterDisplayComponent } from './monster-display/monster-display.component';
import { MonsterFormComponent } from './monster-form/monster-form.component';

const routes: Routes = [
  {
    path: '',
    component: EnterMonsterComponent,
  },
];

@NgModule({
  declarations: [
    EnterMonsterComponent,
    MonsterFormComponent,
    MonsterDisplayComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterMonsterModule {}
