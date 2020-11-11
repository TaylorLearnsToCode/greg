import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureDiceRolledComponent } from './configure-dice-rolled.component';

describe('ConfigureDiceRolledComponent', () => {
  let component: ConfigureDiceRolledComponent;
  let fixture: ComponentFixture<ConfigureDiceRolledComponent>;

  beforeEach(async(() => {
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
