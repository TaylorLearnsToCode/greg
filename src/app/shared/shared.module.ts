import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiceRollerFormComponent } from './components/dice-roller-form/dice-roller-form.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { WeaponsFormComponent } from './components/weapons-form/weapons-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BoundedRangePipe } from './pipes/bounded-range/bounded-range.pipe';
import { PageTemplateComponent } from './templates/page-template/page-template.component';

/** "Private" container for components in the Shared Module to reduce file length, re-using the variable as a spread */
const components = [
  DiceRollerFormComponent,
  MenuBarComponent,
  PageTemplateComponent,
  WeaponsFormComponent,
  WelcomeComponent,
];

const pipes = [BoundedRangePipe];

/** Container module for common or shared widgets and templates for the GREG app */
@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components, FormsModule, ...pipes, ReactiveFormsModule],
})
export class SharedModule {}
