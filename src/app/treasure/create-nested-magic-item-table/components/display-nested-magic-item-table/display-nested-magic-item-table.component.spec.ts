import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNestedMagicItemTableComponent } from './display-nested-magic-item-table.component';

describe('DisplayNestedMagicItemTableComponent', () => {
  let component: DisplayNestedMagicItemTableComponent;
  let fixture: ComponentFixture<DisplayNestedMagicItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNestedMagicItemTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayNestedMagicItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
