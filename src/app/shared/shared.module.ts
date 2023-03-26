import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTemplateComponent } from './templates/page-template/page-template.component';
import { RollableTableComponent } from './templates/rollable-table/rollable-table.component';

const components = [PageTemplateComponent, RollableTableComponent];
const modules = [FormsModule, ReactiveFormsModule];

/** Module to contain shared template, model, and functional elements. */
@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
