import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { readRoutes } from '@shared/utilities/navigation-config/navigation-config.util';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  ...readRoutes(),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
