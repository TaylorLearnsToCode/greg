import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTreasureTypeTableComponent } from './configure-treasure-type-table.component';

describe('ConfigureTreasureTypeTableComponent', () => {
  let component: ConfigureTreasureTypeTableComponent;
  let fixture: ComponentFixture<ConfigureTreasureTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTreasureTypeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTreasureTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
