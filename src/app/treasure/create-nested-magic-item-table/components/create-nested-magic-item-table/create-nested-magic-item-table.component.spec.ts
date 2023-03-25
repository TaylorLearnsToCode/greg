import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNestedMagicItemTableComponent } from './create-nested-magic-item-table.component';

describe('CreateNestedMagicItemTableComponent', () => {
  let component: CreateNestedMagicItemTableComponent;
  let fixture: ComponentFixture<CreateNestedMagicItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNestedMagicItemTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNestedMagicItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
