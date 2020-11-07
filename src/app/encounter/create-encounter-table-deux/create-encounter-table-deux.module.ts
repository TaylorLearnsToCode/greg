import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CreateEncounterTableComponent } from './components/create-encounter-table/create-encounter-table.component';
import { CreateNestedEncounterFormComponent } from './components/create-nested-encounter-form/create-nested-encounter-form.component';
import { CreateStandardEncounterFormComponent } from './components/create-standard-encounter-form/create-standard-encounter-form.component';
import { DicePoolFormComponent } from './components/dice-pool-form/dice-pool-form.component';
import { ConfigureEncounterTableFormComponent } from '@encounter/create-encounter-table-deux/components/configure-encounter-table-form/configure-encounter-table-form.component';
import { CreateMonsterForEncounterFormComponent } from './components/create-monster-for-encounter-form/create-monster-for-encounter-form.component';
import { CreateEncounterFormComponent } from './components/create-encounter-form/create-encounter-form.component';
import { MonsterTacticalMovementPipe } from './pipes/monster-tactical-movement.pipe';

const routes: Routes = [
  {
    path: '',
    component: CreateEncounterTableComponent,
  },
];

@NgModule({
  declarations: [
    CreateEncounterTableComponent,
    CreateStandardEncounterFormComponent,
    DicePoolFormComponent,
    ConfigureEncounterTableFormComponent,
    CreateNestedEncounterFormComponent,
    CreateMonsterForEncounterFormComponent,
    CreateEncounterFormComponent,
    MonsterTacticalMovementPipe,
  ],
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEncounterTableDeuxModule {}
