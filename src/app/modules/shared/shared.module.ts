import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PageTemplateComponent } from './templates/page-template/page-template.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [PageTemplateComponent, WelcomeComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
