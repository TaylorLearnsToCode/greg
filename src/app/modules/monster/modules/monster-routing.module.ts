import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeMonsterComponent } from '../components/welcome-monster/welcome-monster.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeMonsterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonsterRoutingModule {}
