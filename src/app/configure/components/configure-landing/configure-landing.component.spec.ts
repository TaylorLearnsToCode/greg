import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureLandingComponent } from './configure-landing.component';

describe('ConfigureLandingComponent', () => {
  let component: ConfigureLandingComponent;
  let fixture: ComponentFixture<ConfigureLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
