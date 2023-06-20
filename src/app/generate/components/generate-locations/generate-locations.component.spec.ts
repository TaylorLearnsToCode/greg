import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLocationsComponent } from './generate-locations.component';

describe('GenerateLocationsComponent', () => {
  let component: GenerateLocationsComponent;
  let fixture: ComponentFixture<GenerateLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
