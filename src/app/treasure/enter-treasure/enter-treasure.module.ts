import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceRangePipe } from '@shared/pipes/dice-range/dice-range.pipe';
import { SharedModule } from '@shared/shared.module';
import { SpeciePipePipe } from '@treasure/enter-treasure/pipes/specie-pipe/specie-pipe.pipe';
import { TreasureCommonModule } from '@treasure/treasure-common/treasure-common.module';
import { EnterTreasureComponent } from './components/enter-treasure/enter-treasure.component';
import { GemJewelFormComponent } from './components/gem-jewel-form/gem-jewel-form.component';
import { SpecieFormComponent } from './components/specie-form/specie-form.component';
import { TreasureFormComponent } from './components/treasure-form/treasure-form.component';
import { TreasureListComponent } from './components/treasure-list/treasure-list.component';
import { GemOrJewelPipe } from './pipes/gem-or-jewel/gem-or-jewel.pipe';
import { MapOrMagicPipe } from './pipes/map-or-magic/map-or-magic.pipe';
import { RollTreasureComponent } from './components/roll-treasure/roll-treasure.component';

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
    SpeciePipePipe,
    GemOrJewelPipe,
    MapOrMagicPipe,
    RollTreasureComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TreasureCommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [DiceRangePipe],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterTreasureModule {}
