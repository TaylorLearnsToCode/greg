import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOrMagicFormComponent } from './map-or-magic-form.component';

describe('MapOrMagicFormComponent', () => {
  let component: MapOrMagicFormComponent;
  let fixture: ComponentFixture<MapOrMagicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapOrMagicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapOrMagicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
