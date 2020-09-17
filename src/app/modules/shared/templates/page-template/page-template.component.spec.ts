import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTemplateComponent } from './page-template.component';

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageTemplateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use a provided header text', () => {
    const HEADER_TEXT = 'TEST - Test Header Text';
    component.headerText = HEADER_TEXT;
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.headerText).toEqual(HEADER_TEXT);
  });

  it('should assign single-column class designation', () => {
    component.isSingleColumn = true;
    component.ngOnInit();
    expect(component.wrapperClasses).toContain('page-template--single');
  });

  it('should assign double-column class designation', () => {
    component.isSingleColumn = false;
    component.ngOnInit();
    expect(component.wrapperClasses).toContain('page-template--double');
  });
});
