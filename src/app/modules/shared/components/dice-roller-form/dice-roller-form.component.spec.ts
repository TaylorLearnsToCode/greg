import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollerFormComponent } from './dice-roller-form.component';

describe('DiceRollerFormComponent', () => {
  let component: DiceRollerFormComponent;
  let fixture: ComponentFixture<DiceRollerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceRollerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceRollerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
