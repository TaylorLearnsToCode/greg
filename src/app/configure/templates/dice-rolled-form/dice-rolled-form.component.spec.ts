import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRolledFormComponent } from './dice-rolled-form.component';

describe('DiceRolledFormComponent', () => {
  let component: DiceRolledFormComponent;
  let fixture: ComponentFixture<DiceRolledFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiceRolledFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceRolledFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
