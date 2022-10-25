import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeaponsFormComponent } from './weapons-form.component';

describe('WeaponsFormComponent', () => {
  let component: WeaponsFormComponent;
  let fixture: ComponentFixture<WeaponsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
