import { TreasureResult } from './treasure-result.model';

export class TreasureMapResult extends TreasureResult {
  results: TreasureResult[] = [];

  constructor(result?: any) {
    super(result);
    this.massageResults(result);
  }

  private massageResults(result?: any): void {
    if (result !== undefined && result.results && result.results.length) {
      this.results = (result.results as TreasureResult[]).map(
        (r) => new TreasureResult(r)
      );
    }
  }
}
