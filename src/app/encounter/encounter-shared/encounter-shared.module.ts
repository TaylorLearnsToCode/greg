import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HitDicePipe } from './pipes/hit-dice/hit-dice.pipe';
import { NumberAppearingPipe } from './pipes/number-appearing/number-appearing.pipe';
import { WeaponAttacksPipe } from './pipes/weapon-attacks/weapon-attacks.pipe';

const pipes = [HitDicePipe, NumberAppearingPipe, WeaponAttacksPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes, SharedModule],
  imports: [CommonModule, SharedModule],
})
export class EncounterSharedModule {}
