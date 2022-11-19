import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import {
  GemOrJewel,
  TreasureListEntry,
} from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { EnterTreasureControllerService } from '@treasure/enter-treasure/services/enter-treasure-controller/enter-treasure-controller.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-treasure-form',
  templateUrl: './treasure-form.component.html',
  styleUrls: ['./treasure-form.component.scss'],
})
export class TreasureFormComponent implements OnInit, OnDestroy {
  diceToRollForm: UntypedFormGroup;
  entryForm: UntypedFormGroup;
  get gemsForm(): FormArray<FormControl<GemOrJewel>> {
    return this.entryForm.get('gems') as FormArray<FormControl<GemOrJewel>>;
  }
  get jewelryForm(): FormArray<FormControl<GemOrJewel>> {
    return this.entryForm.get('jewelry') as FormArray<FormControl<GemOrJewel>>;
  }
  get mapsAndMagicForm(): FormArray<UntypedFormControl> {
    return this.entryForm.get('mapsAndMagic') as FormArray<UntypedFormControl>;
  }

  private destroySource: Subject<void> = new Subject();

  constructor(private controllerService: EnterTreasureControllerService) {}

  ngOnInit(): void {
    this.diceToRollForm = buildFormFromObject(new DiceRolled()) as FormGroup;
    this.entryForm = buildFormFromObject(new TreasureListEntry()) as FormGroup;
    this.subDiceRollChanges();
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  addGemOrJewel(isJewelry?: boolean): void {
    const treasureList: TreasureListEntry = cloneObject(this.entryForm.value);
    const property: string = isJewelry ? 'jewelry' : 'gems';
    if (doesExist(treasureList[property])) {
      treasureList[property].push(new GemOrJewel());
    } else {
      treasureList[property] = [new GemOrJewel()];
    }
    this.entryForm = buildFormFromObject(treasureList) as FormGroup;
  }

  addMapOrMagic(): void {
    alert('not yet implemented');
    /*const treasureList: TreasureListEntry = cloneObject(this.entryForm.value);
    if (doesExist(treasureList.mapsAndMagic)) {
      treasureList.mapsAndMagic.push(new MagicItemEntry());
    } else {
      treasureList.mapsAndMagic = [new MagicItemEntry()];
    }
    this.entryForm = buildFormFromObject(treasureList) as FormGroup;*/
  }

  private saveDiceToRoll(changes: any): void {
    if (
      doesExist(changes) &&
      !this.controllerService.compareDiceToRoll(this.diceToRollForm.value)
    ) {
      this.controllerService.updateDiceToRoll(this.diceToRollForm.value);
    }
  }

  saveEntry(): void {
    this.controllerService.addEntry(this.entryForm.value);
    this.entryForm.reset();
    this.entryForm.setValue(new TreasureListEntry());
  }

  private subDiceRollChanges(): void {
    this.diceToRollForm.valueChanges
      .pipe(
        tap((changes) => this.saveDiceToRoll(changes)),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }
}
