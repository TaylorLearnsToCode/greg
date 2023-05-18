import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTreasureListComponent } from './configure-treasure-list.component';

describe('ConfigureTreasureListComponent', () => {
  let component: ConfigureTreasureListComponent;
  let fixture: ComponentFixture<ConfigureTreasureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTreasureListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTreasureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
