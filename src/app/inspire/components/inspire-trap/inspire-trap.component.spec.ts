import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspireTrapComponent } from './inspire-trap.component';

describe('InspireTrapComponent', () => {
  let component: InspireTrapComponent;
  let fixture: ComponentFixture<InspireTrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspireTrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspireTrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
