import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TreasureCommonModule } from '@treasure/treasure-common/treasure-common.module';
import { CreateNestedMagicItemTableComponent } from './components/create-nested-magic-item-table/create-nested-magic-item-table.component';
import { EnterNestedMagicItemTableComponent } from './components/enter-nested-magic-item-table/enter-nested-magic-item-table.component';
import { DisplayNestedMagicItemTableComponent } from './components/display-nested-magic-item-table/display-nested-magic-item-table.component';
import { NestedMagicItemTablePresenterComponent } from './components/nested-magic-item-table-presenter/nested-magic-item-table-presenter.component';
import { MagicItemPresenterComponent } from './components/magic-item-presenter/magic-item-presenter.component';

const routes: Routes = [
  {
    path: '',
    component: CreateNestedMagicItemTableComponent,
  },
];

@NgModule({
  declarations: [CreateNestedMagicItemTableComponent, EnterNestedMagicItemTableComponent, DisplayNestedMagicItemTableComponent, NestedMagicItemTablePresenterComponent, MagicItemPresenterComponent],
  imports: [
    CommonModule,
    SharedModule,
    TreasureCommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateNestedMagicItemTableModule {}