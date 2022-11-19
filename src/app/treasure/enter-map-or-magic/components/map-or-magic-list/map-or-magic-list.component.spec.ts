import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOrMagicListComponent } from './map-or-magic-list.component';

describe('MapOrMagicListComponent', () => {
  let component: MapOrMagicListComponent;
  let fixture: ComponentFixture<MapOrMagicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapOrMagicListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapOrMagicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
