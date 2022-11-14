import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EnterTreasureComponent } from './components/enter-treasure/enter-treasure.component';
import { TreasureFormComponent } from './components/treasure-form/treasure-form.component';
import { TreasureListComponent } from './components/treasure-list/treasure-list.component';
import { SpecieFormComponent } from './components/specie-form/specie-form.component';
import { MagicItemFormComponent } from './components/magic-item-form/magic-item-form.component';
import { GemJewelFormComponent } from './components/gem-jewel-form/gem-jewel-form.component';

const routes: Routes = [
  {
    path: '',
    component: EnterTreasureComponent,
  },
];

@NgModule({
  declarations: [
    EnterTreasureComponent,
    TreasureFormComponent,
    TreasureListComponent,
    SpecieFormComponent,
    MagicItemFormComponent,
    GemJewelFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterTreasureModule {}
