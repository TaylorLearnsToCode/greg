import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EnterTreasureComponent } from './components/enter-treasure/enter-treasure.component';

const routes: Routes = [
  {
    path: '',
    component: EnterTreasureComponent,
  },
];

@NgModule({
  declarations: [EnterTreasureComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterTreasureModule {}
