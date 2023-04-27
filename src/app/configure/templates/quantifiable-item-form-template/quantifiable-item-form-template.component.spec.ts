import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantifiableItemFormTemplateComponent } from './quantifiable-item-form-template.component';

describe('QuantifiableItemFormTemplateComponent', () => {
  let component: QuantifiableItemFormTemplateComponent;
  let fixture: ComponentFixture<QuantifiableItemFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantifiableItemFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantifiableItemFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
