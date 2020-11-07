import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsFormComponent } from './weapons-form.component';

describe('WeaponsFormComponent', () => {
  let component: WeaponsFormComponent;
  let fixture: ComponentFixture<WeaponsFormComponent>;

  beforeEach(async(() => {
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
