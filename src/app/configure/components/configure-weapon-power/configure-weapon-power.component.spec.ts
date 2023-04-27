import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureWeaponPowerComponent } from './configure-weapon-power.component';

describe('ConfigureWeaponPowerComponent', () => {
  let component: ConfigureWeaponPowerComponent;
  let fixture: ComponentFixture<ConfigureWeaponPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureWeaponPowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureWeaponPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
