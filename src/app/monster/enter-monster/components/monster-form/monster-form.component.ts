import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';

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

  private initializeMonsterForm() {
    this.monsterForm = this.formBuilder.group({
      system: new FormControl<string>('www'),
    });
  }

  private initializeSystemsMap() {
    this.systems = {};
    this.systems['bx'] = 'Basic / Expert';
    this.systems['www'] = 'Weapons, Wits, & Wizardry';
  }
}
