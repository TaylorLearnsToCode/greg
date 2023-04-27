import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTreasureTypeComponent } from './configure-treasure-type.component';

describe('ConfigureTreasureTypeComponent', () => {
  let component: ConfigureTreasureTypeComponent;
  let fixture: ComponentFixture<ConfigureTreasureTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTreasureTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTreasureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
