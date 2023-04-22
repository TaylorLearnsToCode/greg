import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FromCamelCasePipe } from './pipes/from-camel-case/from-camel-case.pipe';
import { PageTemplateComponent } from './templates/page-template/page-template.component';
import { PrintListComponent } from './templates/print-list/print-list.component';
import { RollableTableComponent } from './templates/rollable-table/rollable-table.component';

const components = [
  PageTemplateComponent,
  RollableTableComponent,
  PrintListComponent,
];
const modules = [FormsModule, ReactiveFormsModule];
const pipes = [FromCamelCasePipe];

/** Module to contain shared template, model, and functional elements. */
@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, ...modules],
  exports: [...components, ...pipes, ...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
