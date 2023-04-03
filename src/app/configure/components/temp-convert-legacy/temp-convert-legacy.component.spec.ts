import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempConvertLegacyComponent } from './temp-convert-legacy.component';

describe('TempConvertLegacyComponent', () => {
  let component: TempConvertLegacyComponent;
  let fixture: ComponentFixture<TempConvertLegacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempConvertLegacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempConvertLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
