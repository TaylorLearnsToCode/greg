import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundedRangeFormComponent } from './bounded-range-form.component';

describe('BoundedRangeFormComponent', () => {
  let component: BoundedRangeFormComponent;
  let fixture: ComponentFixture<BoundedRangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoundedRangeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoundedRangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
