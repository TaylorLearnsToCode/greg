import { Injectable } from '@angular/core';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { throwError } from '@shared/utilities/framework-util/framework.util';

@Injectable({
  providedIn: 'root',
})
export class GenerateWwwTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
  generateGems(article: TreasureArticle): ValueablesResult[] {
    throwError('Method not implemented.');
    return [];
  }
  generateJewelry(article: TreasureArticle): ValueablesResult[] | null {
    throwError('Method not implemented.');
    return [];
  }
  generateMagicItem(item: TreasureArticle): TreasureResult[] | null {
    throwError('Method not implemented.');
    return [];
  }
  generateTreasureMap(article: TreasureArticle): TreasureResult[] | null {
    throwError('Method not implemented.');
    return [];
  }
  generateTreasureMapResult(
    map: ReferenceEntryTable
  ): TreasureMapResult | null {
    throwError('Method not implemented.');
    return null;
  }
  constructor() {
    super();
  }
}
