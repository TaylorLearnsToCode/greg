import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInspirationComponent } from './generate-inspiration.component';

describe('GenerateInspirationComponent', () => {
  let component: GenerateInspirationComponent;
  let fixture: ComponentFixture<GenerateInspirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateInspirationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
