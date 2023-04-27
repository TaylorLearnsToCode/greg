import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTreasureMapComponent } from './configure-treasure-map.component';

describe('ConfigureTreasureMapComponent', () => {
  let component: ConfigureTreasureMapComponent;
  let fixture: ComponentFixture<ConfigureTreasureMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTreasureMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTreasureMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
