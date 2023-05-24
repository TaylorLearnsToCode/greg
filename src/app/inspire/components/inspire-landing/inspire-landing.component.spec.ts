import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspireLandingComponent } from './inspire-landing.component';

describe('InspireLandingComponent', () => {
  let component: InspireLandingComponent;
  let fixture: ComponentFixture<InspireLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspireLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspireLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
