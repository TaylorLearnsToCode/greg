import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
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
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InspireModule {}
