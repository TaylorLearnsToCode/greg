import { Injectable } from '@angular/core';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';

@Injectable({
  providedIn: 'root',
})
export class GenerateBxTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
  generateJewelry(article: TreasureArticle): ValueablesResult[] | null {
    throw new Error('Method not implemented.');
  }
  generateGems(article: TreasureArticle): ValueablesResult[] {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }
}
