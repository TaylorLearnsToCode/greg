import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { EncounterListEntry } from '@encounter/create-from-monster/model/encounter-list-entry';
import { EncounterFromMonsterControllerService } from '@encounter/create-from-monster/services/encounter-from-monster-controller/encounter-from-monster-controller.service';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'greg-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss'],
})
export class MonsterListComponent implements OnInit {
  @ViewChild('fileInput')
  importButtonRef: ElementRef;

  encounterList$: Observable<EncounterListEntry[]>;
  encounterListForm: UntypedFormGroup;
  get encounterListFormArray(): FormArray<FormControl<EncounterListEntry>> {
    return this.encounterListForm.get('encounterFormArray') as FormArray<
      FormControl<EncounterListEntry>
    >;
  }

  private get importButton(): HTMLInputElement {
    return this.importButtonRef.nativeElement as HTMLInputElement;
  }

  constructor(
    private controllerService: EncounterFromMonsterControllerService
  ) {}

  ngOnInit(): void {
    this.encounterListForm = new FormGroup({
      encounterFormArray: new FormArray<FormControl<EncounterListEntry>>([]),
    });
    this.encounterList$ = this.controllerService.encounterList$.pipe(
      tap((list) => this.buildEncounterListForm(list))
    );
  }

  importMonsters(): void {
    this.controllerService.importMonsterList(this.importButton.files[0]);
    this.importButton.value = '';
  }

  private buildEncounterListForm(encounterList: EncounterListEntry[]): void {
    this.encounterListForm.setControl(
      'encounterFormArray',
      buildFormFromObject(encounterList)
    );
  }
}
