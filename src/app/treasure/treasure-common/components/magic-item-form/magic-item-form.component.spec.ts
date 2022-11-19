import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemFormComponent } from './magic-item-form.component';

describe('MagicItemFormComponent', () => {
  let component: MagicItemFormComponent;
  let fixture: ComponentFixture<MagicItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
