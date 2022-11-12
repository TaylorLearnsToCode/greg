import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { MonsterControllerService } from '@monster/enter-monster/services/monster-controller/monster-controller.service';
import { WeaponEquivalence, WwwMonster } from '@shared/model/www-monster.model';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

/** Presenter element for user entry of new monsters. UNDER CONSTRUCTION */
@Component({
  selector: 'greg-monster-form',
  templateUrl: './monster-form.component.html',
  styleUrls: ['./monster-form.component.scss'],
})
export class MonsterFormComponent implements OnInit {
  monsterForm: UntypedFormGroup;

  systems: Object;
  get systemsList(): string[] {
    return Object.keys(this.systems);
  }

  get meleeAttacks(): UntypedFormArray {
    return this.monsterForm.get('meleeAttacks') as UntypedFormArray;
  }

  get missileAttacks(): UntypedFormArray {
    return this.monsterForm.get('missileAttacks') as UntypedFormArray;
  }

  /** MonsterFormComponent Constructor */
  constructor(private monsterController: MonsterControllerService) {}

  /** Initializer Method */
  ngOnInit(): void {
    this.initializeMonsterForm();
    this.initializeSystemsMap();
  }

  addMeleeAttack(): void {
    this.meleeAttacks.push(buildFormFromObject(new WeaponEquivalence()));
  }

  addMissileAttack(): void {
    this.missileAttacks.push(buildFormFromObject(new WeaponEquivalence()));
  }

  addMonsterToSource(): void {
    this.monsterController.addMonster(this.monsterForm.value);
    this.initializeMonsterForm();
  }

  private initializeMonsterForm(): void {
    this.monsterForm = buildFormFromObject(
      new WwwMonster()
    ) as UntypedFormGroup;
    this.monsterForm.addControl('system', new FormControl<string>('www'));
  }

  private initializeSystemsMap(): void {
    this.systems = {};
    this.systems['bx'] = 'Basic / Expert';
    this.systems['www'] = 'Weapons, Wits, & Wizardry';
  }
}
