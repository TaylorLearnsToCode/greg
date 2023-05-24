import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspireLandingComponent } from './components/inspire-landing/inspire-landing.component';
import { InspireSpecialRoomComponent } from './components/inspire-special-room/inspire-special-room.component';
import { InspireTrapComponent } from './components/inspire-trap/inspire-trap.component';

const routes: Routes = [
  {
    path: '',
    component: InspireLandingComponent,
  },
  {
    path: 'special-room',
    component: InspireSpecialRoomComponent,
  },
  { path: 'trap', component: InspireTrapComponent },
];

@NgModule({
  declarations: [
    InspireLandingComponent,
    InspireSpecialRoomComponent,
    InspireTrapComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspireModule {}
