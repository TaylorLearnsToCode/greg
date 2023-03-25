import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLandingComponent } from './generate-landing.component';

describe('GenerateLandingComponent', () => {
  let component: GenerateLandingComponent;
  let fixture: ComponentFixture<GenerateLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
