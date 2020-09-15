import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageTemplateComponent } from './templates/page-template/page-template.component';

@NgModule({
  declarations: [PageTemplateComponent, WelcomeComponent, MenuBarComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PageTemplateComponent],
})
export class SharedModule {}
