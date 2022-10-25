import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigureDiceRolledComponent } from './configure-dice-rolled.component';

describe('ConfigureDiceRolledComponent', () => {
  let component: ConfigureDiceRolledComponent;
  let fixture: ComponentFixture<ConfigureDiceRolledComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureDiceRolledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureDiceRolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
