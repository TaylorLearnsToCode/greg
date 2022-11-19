import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TreasureCommonModule } from '@treasure/treasure-common/treasure-common.module';
import { EnterTreasureComponent } from './components/enter-treasure/enter-treasure.component';
import { GemJewelFormComponent } from './components/gem-jewel-form/gem-jewel-form.component';
import { SpecieFormComponent } from './components/specie-form/specie-form.component';
import { TreasureFormComponent } from './components/treasure-form/treasure-form.component';
import { TreasureListComponent } from './components/treasure-list/treasure-list.component';

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
    GemJewelFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TreasureCommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterTreasureModule {}
