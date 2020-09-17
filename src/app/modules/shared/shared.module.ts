import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageTemplateComponent } from './templates/page-template/page-template.component';

const components = [PageTemplateComponent, WelcomeComponent, MenuBarComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components],
})
export class SharedModule {}
