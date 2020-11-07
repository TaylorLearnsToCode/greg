import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICreateEncounterTableAction } from '@encounter/create-encounter-table-deux/model/create-encounter-table-action.interface';
import { CreateEncounterTableActions } from '@encounter/create-encounter-table-deux/model/create-encounter-table-actions.enum';
import { EncounterType } from '@encounter/create-encounter-table-deux/model/encounter-types.enum';
import { Encounter } from '@encounter/create-encounter-table-deux/model/encounter.model';
import { Monster } from '@shared/model/monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

@Component({
  selector: 'greg-create-encounter-form',
  templateUrl: './create-encounter-form.component.html',
  styleUrls: ['./create-encounter-form.component.scss'],
})
export class CreateEncounterFormComponent implements OnInit, OnChanges {
  @Input() activeEncounterIndex: number;
  @Input() parentForm: FormGroup;
  @Output() createEncounterTableAction = new EventEmitter<
    ICreateEncounterTableAction
  >();
  @ViewChild('importEncounterInput') importInputRef: ElementRef<
    HTMLInputElement
  >;

  readonly ENCOUNTER_TYPE_ITERABLE = Object.keys(EncounterType).filter(
    (key) => !RegExp(/^\d+$/).test(key)
  );
  readonly ENCOUNTER_TYPES = EncounterType;

  get activeEncounterForm(): FormGroup {
    return (this.parentForm.get('encounters') as FormArray).controls[
      this.activeEncounterIndex
    ] as FormGroup;
  }
  set activeEncounterForm(form: FormGroup) {
    (this.parentForm.get('encounters') as FormArray).controls[
      this.activeEncounterIndex
    ] = form;
  }
  get monstersFormArray(): FormArray {
    return this.activeEncounterForm.get('monsters') as FormArray;
  }

  private startValues: Encounter;
  private get importEncounterInput(): HTMLInputElement {
    return this.importInputRef.nativeElement;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (doesExist(this.activeEncounterForm)) {
      this.startValues = new Encounter(this.activeEncounterForm.value);
    }
  }

  addMonster(idx?: number): void {
    const newMonster: FormGroup = buildFormFromObject(
      new Monster()
    ) as FormGroup;
    doesExist(idx)
      ? this.monstersFormArray.push(newMonster)
      : this.monstersFormArray.insert(idx + 1, newMonster);
  }

  export(): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableActions.EXPORT_ENCOUNTER,
      payload: new Encounter(this.activeEncounterForm.value),
    });
  }

  import(): void {
    this.importEncounterInput.click();
  }

  onImportSelected(): void {
    const rawFile: File = this.importEncounterInput.files.item(0);
    if (doesExist(rawFile)) {
      rawFile.text().then((value: string) => {
        const encounter = new Encounter(JSON.parse(value));
        this.activeEncounterForm.patchValue(encounter);
        this.monstersFormArray.clear();
        for (const monster of encounter.monsters) {
          this.monstersFormArray.push(buildFormFromObject(monster));
        }
        this.importEncounterInput.value = null;
      });
    }
  }

  removeMonster(idx: number): void {
    if (doesExist(idx)) {
      this.monstersFormArray.removeAt(idx);
    } else {
      throw Error('Index is required when removing a monster');
    }
  }

  return(): void {
    this.createEncounterTableAction.emit({
      action: CreateEncounterTableActions.RETURN_VIEW,
    } as ICreateEncounterTableAction);
  }

  revert(): void {
    this.activeEncounterForm = buildFormFromObject(
      new Encounter(this.startValues)
    ) as FormGroup;
  }
}
