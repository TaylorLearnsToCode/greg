import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEntryFormComponent } from './map-entry-form.component';

describe('MapEntryFormComponent', () => {
  let component: MapEntryFormComponent;
  let fixture: ComponentFixture<MapEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapEntryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
