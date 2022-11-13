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
  UntypedFormGroup,
} from '@angular/forms';
import { EncounterListEntry } from '@encounter/create-from-monster/model/encounter-list-entry';
import { EncounterFromMonsterControllerService } from '@encounter/create-from-monster/services/encounter-from-monster-controller/encounter-from-monster-controller.service';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'greg-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss'],
})
export class MonsterListComponent implements OnInit, OnDestroy {
  @ViewChild('listInput')
  listInputRef: ElementRef;

  @ViewChild('monsterInput')
  monsterInputRef: ElementRef;

  encounterList$: Observable<EncounterListEntry[]>;
  encounterListForm: UntypedFormGroup;
  get encounterListFormArray(): FormArray<FormControl<EncounterListEntry>> {
    return this.encounterListForm.get('encounterFormArray') as FormArray<
      FormControl<EncounterListEntry>
    >;
  }

  private formSub: Subscription;

  private get listInput(): HTMLInputElement {
    return this.listInputRef.nativeElement as HTMLInputElement;
  }

  private get monsterInput(): HTMLInputElement {
    return this.monsterInputRef.nativeElement as HTMLInputElement;
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
    this.formSub = this.encounterListForm.valueChanges
      .pipe(tap((changes) => this.saveValues(changes)))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (doesExist(this.formSub)) {
      this.formSub.unsubscribe();
    }
  }

  saveValues(changes: any): void {
    if (
      doesExist(changes) &&
      !this.controllerService.compareEncounterList(
        this.encounterListFormArray.value
      )
    ) {
      this.controllerService.updateEncounterList(
        this.encounterListFormArray.value
      );
    }
  }

  clearEncounterTable(): void {
    this.controllerService.clearEncounterList();
  }

  exportEncounterTable(): void {
    this.controllerService.exportEncounterList();
  }

  importExistingList(): void {
    this.controllerService.importExistingList(this.listInput.files[0]);
    this.listInput.value = '';
  }

  importMonsters(): void {
    this.controllerService.importMonsterList(this.monsterInput.files[0]);
    this.monsterInput.value = '';
  }

  private buildEncounterListForm(encounterList: EncounterListEntry[]): void {
    this.encounterListForm.setControl(
      'encounterFormArray',
      buildFormFromObject(encounterList)
    );
  }
}
