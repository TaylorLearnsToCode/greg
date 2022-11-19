import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EnterMapOrMagicComponent } from './components/enter-map-or-magic/enter-map-or-magic.component';
import { MapOrMagicFormComponent } from './components/map-or-magic-form/map-or-magic-form.component';
import { MapOrMagicListComponent } from './components/map-or-magic-list/map-or-magic-list.component';

const routes: Routes = [
  {
    path: '',
    component: EnterMapOrMagicComponent,
  },
];

@NgModule({
  declarations: [EnterMapOrMagicComponent, MapOrMagicFormComponent, MapOrMagicListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterMapOrMagicModule {}
