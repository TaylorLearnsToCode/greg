import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import {
  cloneObject,
  doesExist,
} from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';
import {
  MagicItemTable,
  NestedMagicItemTable,
} from '@treasure/treasure-common/model/magic-item.model';
import {
  MagicItemMap,
  MagicItemMapEntry,
  TreasureMap,
} from '@treasure/treasure-common/model/treasure-map.model';

@Component({
  selector: 'greg-map-entry-form',
  templateUrl: './map-entry-form.component.html',
  styleUrls: ['./map-entry-form.component.scss'],
})
export class MapEntryFormComponent implements OnInit {
  @ViewChild('magicItemImport')
  magicItemImportInputRef: ElementRef;
  private get magicItemImport(): HTMLInputElement {
    return this.magicItemImportInputRef.nativeElement as HTMLInputElement;
  }

  magicMapForm: UntypedFormGroup;
  get magicTreasureFormArray(): FormArray<FormControl<MagicItemMapEntry>> {
    return this.magicMapForm.get('treasure') as FormArray<
      FormControl<MagicItemMapEntry>
    >;
  }
  treasureMapForm: UntypedFormGroup;

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {
    this.initializeTreasureMap();
    this.initializeMagicMap();
  }

  addMagicTreasure(): void {
    const nextMagicForm: MagicItemMap = cloneObject(this.magicMapForm.value);
    nextMagicForm.treasure.push(new MagicItemMapEntry());
    this.magicMapForm = buildFormFromObject(nextMagicForm) as FormGroup;
  }

  importMagicItemList(index: number): void {
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string = fileReader.result as string;
      const list: MagicItemTable | NestedMagicItemTable = JSON.parse(
        result
      ) as any;
      const nextMagicForm: MagicItemMap = cloneObject(this.magicMapForm.value);
      nextMagicForm.treasure[index].item.entry = list;
      this.magicMapForm = buildFormFromObject(nextMagicForm) as FormGroup;
      this.magicItemImport.value = '';
    });
    fileReader.readAsText(this.magicItemImport.files[0]);
  }

  isEntryPresent(entry: MagicItemMapEntry): boolean {
    if (
      doesExist(entry) &&
      doesExist(entry.item) &&
      doesExist(entry.item.entry)
    ) {
      return true;
    } else {
      return false;
    }
  }

  removeEntryAt(index: number): void {
    const nextMagicForm: MagicItemMap = cloneObject(this.magicMapForm.value);
    nextMagicForm.treasure.splice(index, 1);
    this.magicMapForm = buildFormFromObject(nextMagicForm) as FormGroup;
  }

  saveMagicMap(): void {
    this.controllerService.addTreasureMap(this.magicMapForm.value);
    this.initializeMagicMap();
  }

  saveTreasureMap(): void {
    this.controllerService.addTreasureMap(this.treasureMapForm.value);
    this.initializeTreasureMap();
  }

  private initializeMagicMap(): void {
    this.magicMapForm = buildFormFromObject(new MagicItemMap()) as FormGroup;
  }

  private initializeTreasureMap(): void {
    this.treasureMapForm = buildFormFromObject(new TreasureMap()) as FormGroup;
  }
}
