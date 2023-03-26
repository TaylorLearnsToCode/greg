import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';

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

  ngOnInit(): void {
    this.treasureTypeForm = buildFormFromObject(
      new TreasureType()
    ) as FormGroup;
  }

  addTreasureArticle(): void {
    this.articlesFormArray.push(
      buildFormFromObject(new TreasureArticle()) as FormGroup
    );
  }

  removeArticle(index: number): void {
    this.articlesFormArray.removeAt(index);
  }

  shiftArticle(direction: string): void {
    throw new Error(`Shift ${direction} not yet implemented`);
  }
}
