import { Injectable } from '@angular/core';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';

@Injectable({
  providedIn: 'root',
})
export class GenerateWwwTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
  generateGems(article: TreasureArticle): ValueablesResult[] {
    throw new Error('Method not implemented.');
  }
  generateJewelry(article: TreasureArticle): ValueablesResult[] | null {
    throw new Error('Method not implemented.');
  }
  generateTreasureMap(article: TreasureArticle): TreasureResult[] | null {
    throw new Error('Method not implemented.');
  }
  generateTreasureMapResult(
    map: ReferenceEntryTable
  ): TreasureMapResult | null {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }
}
