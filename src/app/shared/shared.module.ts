import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageTemplateComponent } from './templates/page-template/page-template.component';

const components = [PageTemplateComponent];

/** Module to contain shared template, model, and functional elements. */
@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class SharedModule {}
