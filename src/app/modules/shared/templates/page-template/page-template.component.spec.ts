import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTemplateComponent } from './page-template.component';

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageTemplateComponent],
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
});
