import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CreateEncounterTableComponent } from './create-encounter-table/create-encounter-table.component';
import { EncounterTableDisplayPrintComponent } from './encounter-table-display-print/encounter-table-display-print.component';
import { EncounterTableDisplayWebComponent } from './encounter-table-display-web/encounter-table-display-web.component';
import { EncounterTableDisplayComponent } from './encounter-table-display/encounter-table-display.component';
import { EncounterTableFormComponent } from './encounter-table-form/encounter-table-form.component';
import { AttacksAndDamagePipe } from './pipes/attacks-and-damage/attacks-and-damage.pipe';
import { CombinedMovementPipe } from './pipes/combined-movement/combined-movement.pipe';
import { EncounterRollPipe } from './pipes/encounter-roll/encounter-roll.pipe';
import { MonsterTacticalMovementPipe } from './pipes/monster-tactical-movement/monster-tactical-movement.pipe';
import { NoAppearingRangePipe } from './pipes/no-appearing-range/no-appearing-range.pipe';
import { CombinedHitDicePipe } from './pipes/combined-hit-dice/combined-hit-dice.pipe';

const routes: Routes = [
  {
    path: '',
    component: CreateEncounterTableComponent,
  },
];

@NgModule({
  declarations: [
    CreateEncounterTableComponent,
    EncounterTableFormComponent,
    EncounterTableDisplayComponent,
    MonsterTacticalMovementPipe,
    EncounterTableDisplayPrintComponent,
    EncounterRollPipe,
    NoAppearingRangePipe,
    CombinedMovementPipe,
    EncounterTableDisplayWebComponent,
    AttacksAndDamagePipe,
    CombinedHitDicePipe,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEncounterTableModule {}
