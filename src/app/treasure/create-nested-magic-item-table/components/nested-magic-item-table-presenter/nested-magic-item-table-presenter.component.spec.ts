import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedMagicItemTablePresenterComponent } from './nested-magic-item-table-presenter.component';

describe('NestedMagicItemTablePresenterComponent', () => {
  let component: NestedMagicItemTablePresenterComponent;
  let fixture: ComponentFixture<NestedMagicItemTablePresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedMagicItemTablePresenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedMagicItemTablePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
