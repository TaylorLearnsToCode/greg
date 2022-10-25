import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Weapon } from '@shared/model/weapon.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-weapons-form',
  templateUrl: './weapons-form.component.html',
  styleUrls: ['./weapons-form.component.scss'],
})
export class WeaponsFormComponent implements OnInit {
  @Input() parentForm: UntypedFormGroup;
  @Input() set splitLines(split: boolean) {
    this.layoutClass = split ? 'split' : 'single';
  }

  layoutClass = 'single';
  get weaponsFormArray(): UntypedFormArray {
    return this.parentForm.get('attacks') as UntypedFormArray;
  }

  constructor() {}

  ngOnInit(): void {}

  addWeapon(idx?: number): void {
    doesExist(idx)
      ? this.weaponsFormArray.push(buildFormFromObject(new Weapon()))
      : this.weaponsFormArray.insert(idx, buildFormFromObject(new Weapon()));
  }

  removeWeapon(idx: number): void {
    if (doesExist(idx)) {
      this.weaponsFormArray.removeAt(idx);
    } else {
      throw Error('Index is required when removing a weapon or attack');
    }
  }
}
