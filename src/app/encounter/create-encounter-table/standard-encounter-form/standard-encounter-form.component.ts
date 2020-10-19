import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Encounter } from '../model/encounter.model';

@Component({
  selector: 'greg-standard-encounter-form',
  templateUrl: './standard-encounter-form.component.html',
  styleUrls: ['./standard-encounter-form.component.scss'],
})
export class StandardEncounterFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  get formEncounters(): FormArray {
    return this.parentForm.get('encounters') as FormArray;
  }

  /** Exception message for missing index */
  private readonly INDEX_NUMBER_REQUIRED = 'Index Number is Required';

  constructor() {}

  ngOnInit(): void {}

  /**
   * Adds a new encounter to the encounter table after a specified index, {idx}. If no index
   * is specified, inserts the new encounter at the end of the list.
   * @param  {number} idx?
   */
  addEncounter(idx?: number): void {
    idx = doesExist(idx) ? idx : -1;
    const newEncounter: AbstractControl = buildFormFromObject(
      new Encounter(0, 0, [new Monster()])
    );
    if (idx >= 0) {
      this.formEncounters.insert(idx + 1, newEncounter);
    } else {
      this.formEncounters.push(newEncounter);
    }
  }

  /**
   * Removes the encounter at the target index {idx} from the encounter table,
   * provided {idx} is a valid target. If no index is provided, throws an error.
   * @param  {number} idx
   * @throws INDEX_NUMBER_REQUIRED
   */
  removeEncounter(idx: number): void {
    if (this.validateEncounterRemove(idx)) {
      this.formEncounters.removeAt(idx);
    }
  }

  /**
   * Returns TRUE if there are encounters to remove from the encounter form and the
   * provided index is a valid entry to be removed. If no index is provided, throws
   * an error.
   * @param  {number} idx
   * @throws INDEX_NUMBER_REQUIRED
   */
  private validateEncounterRemove(idx: number): boolean {
    if (!doesExist(idx)) {
      throw new Error(this.INDEX_NUMBER_REQUIRED);
    }
    return this.formEncounters.length > 0 && idx < this.formEncounters.length;
  }
}
