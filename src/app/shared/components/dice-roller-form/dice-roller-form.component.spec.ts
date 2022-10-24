import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { SharedModule } from '@shared/shared.module';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { DiceRollerFormComponent } from './dice-roller-form.component';

describe('DiceRollerFormComponent', () => {
  let component: DiceRollerFormComponent;
  let fixture: ComponentFixture<DiceRollerFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DiceRollerFormComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceRollerFormComponent);
    component = fixture.componentInstance;
    component.parentForm = buildFormFromObject(
      new DiceRolled(1, 6)
    ) as FormGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
