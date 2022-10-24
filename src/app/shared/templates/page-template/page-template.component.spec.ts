import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageDisplayMode } from '@shared/model/page-display-mode.enum';
import { PageTemplateComponent } from './page-template.component';

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeEach(waitForAsync(() => {
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
    component.pageDisplayMode = PageDisplayMode.SINGLE;
    component.ngOnInit();
    expect(component.wrapperClasses).toContain('page-template--single');
  });

  it('should assign double-column class designation', () => {
    component.pageDisplayMode = PageDisplayMode.DOUBLE;
    component.ngOnInit();
    expect(component.wrapperClasses).toContain('page-template--double');
  });
});
