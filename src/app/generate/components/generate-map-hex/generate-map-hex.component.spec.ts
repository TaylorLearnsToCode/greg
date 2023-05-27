import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMapHexComponent } from './generate-map-hex.component';

describe('GenerateMapHexComponent', () => {
  let component: GenerateMapHexComponent;
  let fixture: ComponentFixture<GenerateMapHexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateMapHexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateMapHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
