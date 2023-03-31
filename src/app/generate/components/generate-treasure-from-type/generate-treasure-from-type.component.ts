import { Component, OnInit } from '@angular/core';
import { TreasureResult } from '@generate/model/treasure-result.model';
import { GenerateTreasureService } from '@generate/services/generate-treasure/generate-treasure.service';
import { TreasureType } from '@shared/model/treasure/treasure-type.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'greg-generate-treasure-from-type',
  templateUrl: './generate-treasure-from-type.component.html',
  styleUrls: ['./generate-treasure-from-type.component.scss'],
})
export class GenerateTreasureFromTypeComponent implements OnInit {
  hoard$: Observable<TreasureResult[]>;
  treasureTypeList$: Observable<TreasureType[]>;

  private hoardSource = new BehaviorSubject<TreasureResult[]>([]);

  constructor(
    private dataService: DataManagerService,
    private treasureGenService: GenerateTreasureService
  ) {}

  ngOnInit(): void {
    this.hoard$ = this.hoardSource.asObservable();
    this.treasureTypeList$ = this.dataService.dataState$.pipe(
      map((state) => state.treasureTypes)
    );
  }

  /**
   * Provided a treasure type, rolls said treasure type according to system and publishes
   * the result via the hoard observable.
   *
   * @param  {TreasureType} type
   */
  generateTreasure(type: TreasureType): void {
    this.hoardSource.next(this.treasureGenService.generateTreasure(type));
  }
}
