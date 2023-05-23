import { Injectable } from '@angular/core';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { ReferenceEntryTable } from '@shared/model/framework/reference-entry-table.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { throwError } from '@shared/utilities/framework-util/framework.util';
import { BxGemsService } from './bx-gems/bx-gems.service';
import { BxJewelryService } from './bx-jewelry/bx-jewelry.service';
@Injectable({
  providedIn: 'root',
})
export class GenerateBxTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
constructor(
    private gemService: BxGemsService,
    private jewelryService: BxJewelryService
  ) {
    super();
  }
  generateGems(article: TreasureArticle): ValueablesResult[] | null {
    return this.gemService.generateGems(article);
  }
  generateJewelry(article: TreasureArticle): ValueablesResult[] | null {
    return this.jewelryService.generateJewelryPieces(article);
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
    treasureMap: ReferenceEntryTable
  ): TreasureMapResult | null {
    throwError('Method not implemented.');
    return null;
  }
  
}
