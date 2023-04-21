import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTreasureMapComponent } from './generate-treasure-map.component';

describe('GenerateTreasureMapComponent', () => {
  let component: GenerateTreasureMapComponent;
  let fixture: ComponentFixture<GenerateTreasureMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTreasureMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTreasureMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
