import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MagicItemDisplayPipe } from './pipes/magic-item-display/magic-item-display.pipe';

const components = [];

const pipes = [MagicItemDisplayPipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, SharedModule],
  exports: [...components, ...pipes],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TreasureCommonModule {}
