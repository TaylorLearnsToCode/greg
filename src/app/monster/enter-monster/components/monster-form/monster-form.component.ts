import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { WwwMonster } from '@shared/model/www-monster.model';
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

  /** MonsterFormComponent Constructor */
  constructor(private formBuilder: FormBuilder) {}

  /** Initializer Method */
  ngOnInit(): void {
    this.initializeMonsterForm();
    this.initializeSystemsMap();
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
