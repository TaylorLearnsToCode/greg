import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PageTemplateComponent } from './templates/page-template/page-template.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

@NgModule({
  declarations: [PageTemplateComponent, WelcomeComponent, MenuBarComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
