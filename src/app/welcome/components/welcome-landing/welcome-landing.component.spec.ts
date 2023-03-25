import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLandingComponent } from './welcome-landing.component';

describe('WelcomeLandingComponent', () => {
  let component: WelcomeLandingComponent;
  let fixture: ComponentFixture<WelcomeLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
