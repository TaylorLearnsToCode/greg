import { Injectable } from '@angular/core';
import { AbstractTreasureGenerator } from '@generate/model/abstract-treasure-generator.model';
import { TreasureGeneratorService } from '@generate/model/treasure-generator-service.interface';
import { TreasureMapResult } from '@generate/model/treasure-map-result.model';
import { ValueablesResult } from '@generate/model/valuables-result.model';
import { TreasureArticle } from '@shared/model/treasure/treasure-article.model';
import { TreasureMap } from '@shared/model/treasure/treasure-map.model';

@Injectable({
  providedIn: 'root',
})
export class GenerateBxTreasureService
  extends AbstractTreasureGenerator
  implements TreasureGeneratorService
{
  generateGems(article: TreasureArticle): ValueablesResult[] {
    throw new Error('Method not implemented.');
  }
  generateJewelry(article: TreasureArticle): ValueablesResult[] | null {
    throw new Error('Method not implemented.');
  }
  generateTreasureMap(treasureMap: TreasureMap): TreasureMapResult | null {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }
}
