import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemTableDisplayComponent } from './magic-item-table-display.component';

describe('MagicItemTableDisplayComponent', () => {
  let component: MagicItemTableDisplayComponent;
  let fixture: ComponentFixture<MagicItemTableDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicItemTableDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicItemTableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
