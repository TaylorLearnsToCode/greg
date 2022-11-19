import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MagicItemFormComponent } from './components/magic-item-form/magic-item-form.component';

const components = [MagicItemFormComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TreasureCommonModule {}
