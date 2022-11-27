import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import {
  areEqual,
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import {
  GemOrJewel,
  MapsAndMagicEntry,
  TreasureListEntry,
} from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { EnterTreasureControllerService } from '@treasure/enter-treasure/services/enter-treasure-controller/enter-treasure-controller.service';
import { NestedMagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-treasure-form',
  templateUrl: './treasure-form.component.html',
  styleUrls: ['./treasure-form.component.scss'],
})
export class TreasureFormComponent implements OnInit, OnDestroy {
  @ViewChild('mapOrMagicItemInput')
  mapOrMagicItemInputRef: ElementRef;
  private get mapOrMagicInput(): HTMLInputElement {
    return this.mapOrMagicItemInputRef.nativeElement as HTMLInputElement;
  }

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
  private get entry(): TreasureListEntry {
    return cloneObject(this.entryForm.value) as TreasureListEntry;
  }

  constructor(private controllerService: EnterTreasureControllerService) {}

  ngOnInit(): void {
    this.diceToRollForm = buildFormFromObject(new DiceRolled()) as FormGroup;
    this.entryForm = buildFormFromObject(new TreasureListEntry()) as FormGroup;
    this.subDiceRollChanges();
    this.subTreasureList();
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  addGemOrJewel(isJewelry?: boolean): void {
    const treasureList: TreasureListEntry = this.entry;
    const property: string = isJewelry ? 'jewelry' : 'gems';
    if (doesExist(treasureList[property])) {
      treasureList[property].push(new GemOrJewel());
    } else {
      treasureList[property] = [new GemOrJewel()];
    }
    this.entryForm = buildFormFromObject(treasureList) as FormGroup;
  }

  importMapOrMagic(): void {
    const file: File = this.mapOrMagicInput.files[0];
    const treasureList: TreasureListEntry = this.entry;
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const item: NestedMagicItemTable = JSON.parse(
        result
      ) as NestedMagicItemTable;
      const nextEntry: MapsAndMagicEntry = new MapsAndMagicEntry({
        name: item.name,
        entry: item,
      } as MapsAndMagicEntry);
      if (doesExist(treasureList.mapsAndMagic)) {
        treasureList.mapsAndMagic.push(nextEntry);
      } else {
        treasureList.mapsAndMagic = [nextEntry];
      }
      this.mapOrMagicInput.value = '';
      this.entryForm = buildFormFromObject(treasureList) as FormGroup;
    });
    fileReader.readAsText(file);
  }

  removeArrayElementAt(arrayProperty: string, index: number): void {
    const nextEntry: TreasureListEntry = this.entry;
    nextEntry[arrayProperty].splice(index, 1);
    this.entryForm = buildFormFromObject(nextEntry) as FormGroup;
  }

  saveEntry(): void {
    this.controllerService.addEntry(this.entryForm.value);
    this.entryForm.reset();
    this.entryForm.setValue(new TreasureListEntry());
  }

  private saveDiceToRoll(changes: any): void {
    if (
      doesExist(changes) &&
      !this.controllerService.compareDiceToRoll(this.diceToRollForm.value)
    ) {
      this.controllerService.updateDiceToRoll(this.diceToRollForm.value);
    }
  }

  private subDiceRollChanges(): void {
    this.diceToRollForm.valueChanges
      .pipe(
        tap((changes) => this.saveDiceToRoll(changes)),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }

  private subTreasureList(): void {
    this.controllerService.treasureList$
      .pipe(
        tap((treasureList) => {
          if (!areEqual(treasureList.diceToRoll, this.diceToRollForm.value)) {
            this.diceToRollForm.setValue(treasureList.diceToRoll);
          }
        }),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }
}
