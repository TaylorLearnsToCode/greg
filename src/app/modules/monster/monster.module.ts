import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WelcomeMonsterComponent } from './components/welcome-monster/welcome-monster.component';
import { MonsterRoutingModule } from './modules/monster-routing.module';
import { MonsterServiceModule } from './modules/monster-service.module';

@NgModule({
  declarations: [WelcomeMonsterComponent],
  imports: [
    CommonModule,
    MonsterRoutingModule,
    MonsterServiceModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MonsterModule {}
