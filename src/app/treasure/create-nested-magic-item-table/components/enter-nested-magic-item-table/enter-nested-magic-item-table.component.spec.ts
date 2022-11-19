import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNestedMagicItemTableComponent } from './enter-nested-magic-item-table.component';

describe('EnterNestedMagicItemTableComponent', () => {
  let component: EnterNestedMagicItemTableComponent;
  let fixture: ComponentFixture<EnterNestedMagicItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterNestedMagicItemTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterNestedMagicItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
