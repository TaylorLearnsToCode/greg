import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplaySupportedSystemPipe } from '@shared/pipes/display-supported-system/display-supported-system.pipe';
import { FromCamelCasePipe } from './pipes/from-camel-case/from-camel-case.pipe';
import { PageTemplateComponent } from './templates/page-template/page-template.component';
import { PrintListComponent } from './templates/print-list/print-list.component';

const components = [PageTemplateComponent, PrintListComponent];
const modules = [FormsModule, ReactiveFormsModule];
const pipes = [DisplaySupportedSystemPipe, FromCamelCasePipe];

/** Module to contain shared template, model, and functional elements. */
@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, ...modules],
  exports: [...components, ...pipes, ...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
