import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'greg-configure-treasure-type',
  templateUrl: './configure-treasure-type.component.html',
  styleUrls: ['./configure-treasure-type.component.scss'],
})
export class ConfigureTreasureTypeComponent implements OnInit {
  get articlesFormArray(): FormArray<FormGroup> {
    return this.treasureTypeForm.get('entries') as FormArray<FormGroup>;
  }
  treasureTypeForm: FormGroup;
  treasureTypes$: Observable<TreasureType[]>;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.treasureTypeForm = buildFormFromObject(
      new TreasureType()
    ) as FormGroup;
    this.treasureTypes$ = this.dataService.dataState$.pipe(
      map((dataState) => dataState.treasureTypes)
    );
  }

  addTreasureArticle(): void {
    this.articlesFormArray.push(
      buildFormFromObject(new TreasureArticle()) as FormGroup
    );
  }

  removeArticle(index: number): void {
    this.articlesFormArray.removeAt(index);
  }

  saveArticle(): void {
    this.dataService.persist(
      DataManagerService.PERSISTENCE_TYPES.treasureType,
      this.treasureTypeForm.value
    );
  }

  shiftArticle(index: number, direction: string): void {
    const targetControl = this.articlesFormArray.at(index);
    let newIndex = index;
    switch (direction) {
      case 'up':
        newIndex--;
        break;
      case 'down':
        newIndex++;
        break;
      default:
        throw new Error(`Invalid direction provided: ${direction}`);
    }
    this.articlesFormArray.removeAt(index);
    this.articlesFormArray.insert(newIndex, targetControl);
  }
}
