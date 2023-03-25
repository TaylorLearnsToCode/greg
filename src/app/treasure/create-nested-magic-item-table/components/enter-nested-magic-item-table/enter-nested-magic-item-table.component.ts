import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { NestedMagicItemTableControllerService } from '@treasure/create-nested-magic-item-table/services/nested-magic-item-table-controller/nested-magic-item-table-controller.service';
import { NestedMagicItemTable } from '@treasure/treasure-common/model/magic-item.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'greg-enter-nested-magic-item-table',
  templateUrl: './enter-nested-magic-item-table.component.html',
  styleUrls: ['./enter-nested-magic-item-table.component.scss'],
})
export class EnterNestedMagicItemTableComponent implements OnInit, OnDestroy {
  @ViewChild('uploadEntryInput')
  uploadEntryInputRef: ElementRef;

  nestedTable$: Observable<NestedMagicItemTable>;
  nestedTableForm: FormGroup;

  get entries(): FormArray {
    return this.nestedTableForm.get('entries') as FormArray;
  }
  set entries(formArray: FormArray) {
    this.nestedTableForm.setControl('entries', formArray);
  }

  get uploadEntryInput(): HTMLInputElement {
    return this.uploadEntryInputRef.nativeElement as HTMLInputElement;
  }

  private destroySource: Subject<void> = new Subject();

  constructor(
    private controllerService: NestedMagicItemTableControllerService
  ) {}

  ngOnInit(): void {
    this.initializeNestedTableForm();
    this.controllerService.nestedTable$
      .pipe(
        tap(
          (table) =>
            (this.entries = buildFormFromObject(table.entries) as FormArray)
        ),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySource.next();
  }

  importEntry(): void {
    this.controllerService.importEntry(this.uploadEntryInput.files[0]);
    this.uploadEntryInput.value = '';
  }

  private initializeNestedTableForm(): void {
    this.nestedTableForm = buildFormFromObject(
      new NestedMagicItemTable()
    ) as FormGroup;
    this.nestedTableForm.valueChanges
      .pipe(
        tap((table) => {
          if (!this.controllerService.compareTable(table)) {
            this.controllerService.updateTable(table);
          }
        }),
        takeUntil(this.destroySource)
      )
      .subscribe();
  }
}
