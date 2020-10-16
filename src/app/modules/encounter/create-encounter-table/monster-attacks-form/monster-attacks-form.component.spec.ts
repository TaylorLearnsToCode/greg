import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Monster } from '@shared/model/monster.model';
import { Weapon } from '@shared/model/weapon.model';
import { SharedModule } from '@shared/shared.module';
import { areEqual } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { MonsterAttacksFormComponent } from './monster-attacks-form.component';

describe('MonsterAttacksFormComponent', () => {
  let component: MonsterAttacksFormComponent;
  let fixture: ComponentFixture<MonsterAttacksFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterAttacksFormComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterAttacksFormComponent);
    component = fixture.componentInstance;
    component.monsterFormGroup = buildMonsterFormGroup();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to add attacks', () => {
    expect(component.monsterAttacks.controls.length).toBe(1);
    component.addMonsterAttack(0);
    expect(component.monsterAttacks.controls.length).toBe(2);
  });

  it('should be able to remove a monster attack', () => {
    const firstAttack: Weapon = new Weapon('First');
    const secondAttack: Weapon = new Weapon('Second');
    component.addMonsterAttack(0);
    component.monsterAttacks.patchValue([
      { ...firstAttack },
      { ...secondAttack },
    ]);
    expect(component.monsterAttacks.controls.length).toBe(2);
    component.removeMonsterAttack(0);
    expect(component.monsterAttacks.controls.length).toBe(1);
    expect(
      areEqual(component.monsterAttacks.controls[0].value, secondAttack)
    ).toBeTrue();
  });

  it('should not remove the last attack', () => {
    expect(component.monsterAttacks.controls.length).toBe(1);
    component.removeMonsterAttack(0);
    expect(component.monsterAttacks.controls.length).toBe(1);
  });

  /* Utility Functions */
  function buildMonsterFormGroup(): FormGroup {
    return buildFormFromObject(new Monster()) as FormGroup;
  }
});
