import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MagicItemEntryFormComponent } from '@treasure/enter-map-or-magic/components/magic-item-entry-form/magic-item-entry-form.component';
import { MagicItemTableDisplayComponent } from '@treasure/enter-map-or-magic/components/magic-item-table-display/magic-item-table-display.component';
import { TreasureCommonModule } from '@treasure/treasure-common/treasure-common.module';
import { EnterMapOrMagicComponent } from './components/enter-map-or-magic/enter-map-or-magic.component';
import { MapEntryFormComponent } from './components/map-entry-form/map-entry-form.component';

const routes: Routes = [
  {
    path: '',
    component: EnterMapOrMagicComponent,
  },
];

@NgModule({
  declarations: [
    EnterMapOrMagicComponent,
    MagicItemEntryFormComponent,
    MagicItemTableDisplayComponent,
    MapEntryFormComponent,
  ],
  imports: [
    CommonModule,
    TreasureCommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterMapOrMagicModule {}
