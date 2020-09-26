import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageTemplateComponent } from './templates/page-template/page-template.component';

/** "Private" container for components in the Shared Module to reduce file length, re-using the variable as a spread */
const components = [PageTemplateComponent, WelcomeComponent, MenuBarComponent];

/** Container module for common or shared widgets and templates for the GREG app */
@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
