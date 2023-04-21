import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorPageTemplateComponent } from './generator-page-template.component';

describe('GeneratorPageTemplateComponent', () => {
  let component: GeneratorPageTemplateComponent;
  let fixture: ComponentFixture<GeneratorPageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorPageTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
