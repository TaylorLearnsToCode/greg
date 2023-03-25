import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemJewelFormComponent } from './gem-jewel-form.component';

describe('GemJewelFormComponent', () => {
  let component: GemJewelFormComponent;
  let fixture: ComponentFixture<GemJewelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GemJewelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemJewelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
