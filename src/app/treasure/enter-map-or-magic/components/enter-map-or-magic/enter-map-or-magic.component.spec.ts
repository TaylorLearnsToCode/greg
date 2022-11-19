import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMapOrMagicComponent } from './enter-map-or-magic.component';

describe('EnterMapOrMagicComponent', () => {
  let component: EnterMapOrMagicComponent;
  let fixture: ComponentFixture<EnterMapOrMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterMapOrMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterMapOrMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
